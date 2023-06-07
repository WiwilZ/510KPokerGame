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
	fixed4 texColor = SAMPLE_TEXTURE(u_texture, In.TexCoord);
	fixed4 outColor = texColor * In.Color;
	outColor.rgb *= In.Color.a;
	return outColor;
}