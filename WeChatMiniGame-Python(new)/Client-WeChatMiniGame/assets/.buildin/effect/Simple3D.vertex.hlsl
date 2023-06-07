#include <common.inc>

cbuffer Material
{
	float4 _Color;
}

struct FVertexOutput
{
	float4 Position : SV_Position;
};

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput VPOut;
	Effect3DVertexProcess(In, VPOut);

	Out.Position = WorldToClipPosition(VPOut.WorldPosition);
}