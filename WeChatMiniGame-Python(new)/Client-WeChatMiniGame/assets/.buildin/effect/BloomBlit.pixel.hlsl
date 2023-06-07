#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

cbuffer PostprocessBloomBlit {
	float _Intensity;
}

float4 Main(in FVertexOutput In) : SV_Target0
{
	return float4(_Intensity * SAMPLE_TEXTURE(sourceTex, In.TexCoord).xyz, 1.0);
}
