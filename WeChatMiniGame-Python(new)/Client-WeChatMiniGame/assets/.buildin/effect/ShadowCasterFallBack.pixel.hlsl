#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float PositionZ : TEXCOORD0;
};

float4 Main(in FVertexOutput In) : SV_Target0
{
	return packDepth(In.PositionZ * 0.5 + 0.5);
}