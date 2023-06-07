#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float3 LocalPos : TEXCOORD0;
};


DECLARE_CUBEMAP(_MainTex);

float4 Main(in FVertexOutput In) : SV_Target0
{
	float3 dir = normalize(In.LocalPos);
	// return float4(dir, 1.0);
	return SAMPLE_CUBEMAP(_MainTex, dir);
}
