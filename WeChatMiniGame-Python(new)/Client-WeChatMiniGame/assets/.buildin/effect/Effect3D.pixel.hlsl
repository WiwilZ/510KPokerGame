#include <common.inc>

cbuffer Material
{
	float4 _TintColor;
	float4 _MainTex_ST;
	float _Bright;
}

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : COLOR0;
};

DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_MaskTex);

float4 Main(in FVertexOutput In) : SV_Target0
{
	float4 color = _Bright * In.Color * SAMPLE_TEXTURE(_MainTex, In.TexCoord) * _TintColor;
	half mask = SAMPLE_TEXTURE(_MaskTex, In.TexCoord).r;
	color.w = color.w * mask;
	color = clamp(color, 0, 1);
	return color;
}