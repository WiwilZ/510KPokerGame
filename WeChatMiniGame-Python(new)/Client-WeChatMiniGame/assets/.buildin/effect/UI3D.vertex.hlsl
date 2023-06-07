#include <common.inc>

struct FVertexInput
{
	float3 Position : a_position;
	float2 TexCoord: a_texCoord;
	float4 Color: a_color;
};

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : TEXCOORD1;
};

cbuffer Canvas {
	float u_renderMode;
	float u_proportionalScale;
}


void Main(in FVertexInput In, out FVertexOutput Out)
{

	float vertexX = In.Position.x * u_proportionalScale;
	float vertexY = In.Position.y * u_proportionalScale;
	float vertexZ = In.Position.z * u_proportionalScale;

	if (u_renderMode == 1.0) {
		// billboard
		float3 vpos = mul(float3x3(u_world), float3(vertexX, vertexY, vertexZ));
		float4 worldCoord = float4(u_world[3][0], u_world[3][1], u_world[3][2], 1.0);
		float4 viewPos = mul(u_view, worldCoord) + float4(vpos, 0.0);

		Out.Position = mul(u_projection, viewPos);
	} else {
		Out.Position = mul(u_projection, mul(u_view, mul(u_world, float4(vertexX, vertexY, vertexZ, 1.0))));
	}


	Out.Color = In.Color / 255.0;
	Out.TexCoord = In.TexCoord;
}