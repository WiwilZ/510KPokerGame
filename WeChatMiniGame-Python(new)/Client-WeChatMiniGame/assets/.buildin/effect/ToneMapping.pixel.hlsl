#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

cbuffer PostprocessHDR {
	float _Exposure;
}

float4 Main(in FVertexOutput In) : SV_Target0
{
	const float gamma = 2.2;
	float4 color = SAMPLE_TEXTURE(sourceTex, In.TexCoord);
	float3 mapped = 1 - exp(-pow(color.xyz, 2.2) * _Exposure);
	mapped = pow(mapped, 1 / gamma);
	return float4(mapped, color.w);
}
