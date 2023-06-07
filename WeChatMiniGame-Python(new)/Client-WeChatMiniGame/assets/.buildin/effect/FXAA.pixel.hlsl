#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
};

#define FXAA_SPAN_MAX 16.0
#define FXAA_REDUCE_MUL   (1.0/FXAA_SPAN_MAX)
#define FXAA_REDUCE_MIN   (1.0/128.0)

float4 blend(float4 a, float4 b) {
    if (a.w + b.w < 0.0001f) {
        return float4(0, 0, 0, 0);
    }
    return float4((a.xyz * a.w + b.xyz * b.w) / (a.w + b.w), (a.w + b.w) * .5);
}

float4 Main(in FVertexOutput In) : SV_Target0
{

    float2 uv = In.TexCoord;
    float2 step = 1.f / float2(u_width, u_height);

	/**
	 * @modified by shanexyzhou 2020.08.30
	 * 原本的fxaa不支持alpha通道参与亮度计算，如果背景是(0,0,0,0)的透明像素，就会当成黑色来计算，
	 * 这样的话fxaa之后的图案周围会有黑圈。
	 * 并且如果只采用原像素点的alpha通道作为新像素点的alpha通道，那在渲染结果被应用到另一张贴图中时，边缘的锯齿感还是很明显。
	 * 所以魔改了一版（如果原图的alpha通道都是1的话，那结果还是和原来一样）。
	 */
    float4 colorNW = SAMPLE_TEXTURE(sourceTex, uv + float2(-1, -1) * step);
    float4 colorNE = SAMPLE_TEXTURE(sourceTex, uv + float2(1, -1) * step);
    float4 colorSW = SAMPLE_TEXTURE(sourceTex, uv + float2(-1, 1) * step);
    float4 colorSE = SAMPLE_TEXTURE(sourceTex, uv + float2(1, 1) * step);
    float3 rgbNW = colorNW.xyz;
    float3 rgbNE = colorNE.xyz;
    float3 rgbSW = colorSW.xyz;
    float3 rgbSE = colorSE.xyz;
    float4 colorM = SAMPLE_TEXTURE(sourceTex, uv);
    float3 rgbM = colorM.xyz;

    float3 luma = float3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma) * colorNW.w;
    float lumaNE = dot(rgbNE, luma) * colorNE.w;
    float lumaSW = dot(rgbSW, luma) * colorSW.w;
    float lumaSE = dot(rgbSE, luma) * colorSE.w;
    float lumaM  = dot(rgbM,  luma) * colorM.w;

    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    float2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max(
        (lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),
        FXAA_REDUCE_MIN);
    float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);
    
    dir = min(float2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
          max(float2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
          dir * rcpDirMin)) * step;

    float4 colorA = blend(
        SAMPLE_TEXTURE(sourceTex, uv + dir * (1.0/3.0 - 0.5)),
        SAMPLE_TEXTURE(sourceTex, uv + dir * (2.0/3.0 - 0.5))
    );

    float4 colorB = colorA * .5 + blend(
        SAMPLE_TEXTURE(sourceTex, uv + dir * (0.0/3.0 - 0.5)),
        SAMPLE_TEXTURE(sourceTex, uv + dir * (3.0/3.0 - 0.5))
    ) * .5;
    
    float lumaB = dot(colorB.xyz, luma) * colorB.w;

    if((lumaB < lumaMin) || (lumaB > lumaMax)) return colorA;
    
    return colorB; 
}
