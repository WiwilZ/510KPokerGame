#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

cbuffer PostprocessBoxSampling {
	float _Intensity;
}

float4 Main(in FVertexOutput In) : SV_Target0
{
	float2 uv = In.TexCoord;
	float4 o = float2(1.0 / u_width, 1.0 / u_height).xyxy * float2(-.5, .5).xxyy;
	float3 s =
		SAMPLE_TEXTURE(sourceTex, uv + o.xy).xyz + SAMPLE_TEXTURE(sourceTex, uv + o.zy).xyz +
		SAMPLE_TEXTURE(sourceTex, uv + o.xw).xyz + SAMPLE_TEXTURE(sourceTex, uv + o.zw).xyz;
	return float4(_Intensity * s * 0.25f, 1.f);
}
