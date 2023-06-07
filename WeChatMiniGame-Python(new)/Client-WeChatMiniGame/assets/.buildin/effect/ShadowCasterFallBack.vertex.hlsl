#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float PositionZ : TEXCOORD0;
};

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput VPOut;
	Effect3DVertexProcess(In, VPOut);

	Out.Position = mul(u_lightSpaceMatrix, VPOut.WorldPosition);
	Out.PositionZ = Out.Position.z / Out.Position.w;
}