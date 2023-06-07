#include <common.inc>
DECLARE_TEXTURE(u_texture);

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : TEXCOORD1;
};

float4 Main(in FVertexOutput In) : SV_Target0
{
		return SAMPLE_TEXTURE(u_texture, In.TexCoord) * In.Color;
}