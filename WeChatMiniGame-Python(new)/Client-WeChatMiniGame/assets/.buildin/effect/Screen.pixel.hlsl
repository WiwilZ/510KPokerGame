#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

float4 Main(in FVertexOutput In) : SV_Target0
{
	return SAMPLE_TEXTURE(sourceTex, In.TexCoord);
}
