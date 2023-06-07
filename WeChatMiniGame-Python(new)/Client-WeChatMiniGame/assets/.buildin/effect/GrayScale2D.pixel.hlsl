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
	float4 color = SAMPLE_TEXTURE(u_texture, In.TexCoord) * In.Color;
	float grayscale = dot(color.xyz, float3(0.299, 0.587, 0.114));
	color.x = grayscale;
	color.y = grayscale;
	color.z = grayscale;

	return color;
}