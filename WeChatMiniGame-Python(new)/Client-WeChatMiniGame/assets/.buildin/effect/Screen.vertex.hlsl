#include <common.inc>

struct FVertexInput
{
	float2 Position : a_position;
};

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

void Main(in FVertexInput In, out FVertexOutput Out)
{
	Out.Position = float4(In.Position, 0, 1);
	Out.TexCoord = In.Position * .5 + .5;
}