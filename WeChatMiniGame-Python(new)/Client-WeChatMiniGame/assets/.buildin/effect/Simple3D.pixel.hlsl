#include <common.inc>

cbuffer Material
{
	float4 _Color;
}

struct FVertexOutput
{
	float4 Position : SV_Position;
};

float4 Main(in FVertexOutput In) : SV_Target0
{
	return _Color;
}