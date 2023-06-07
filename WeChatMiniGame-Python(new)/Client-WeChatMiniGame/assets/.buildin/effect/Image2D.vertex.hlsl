#include <common.inc>

struct FVertexInput
{
	float2 Position : a_position;
	float2 TexCoord: a_texCoord;
	float4 Color: a_color;
};

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : TEXCOORD1;
};

void Main(in FVertexInput In, out FVertexOutput Out)
{
	Out.TexCoord = In.TexCoord;
	Out.Color = In.Color / 255.0;
	Out.Position = mul(u_projection, mul(u_view, mul(u_world, float4(In.Position, -1.0, 1.0))));
}