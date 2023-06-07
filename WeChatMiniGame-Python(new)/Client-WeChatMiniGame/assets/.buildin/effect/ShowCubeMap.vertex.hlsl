#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float3 LocalPos : TEXCOORD0;
};

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput Skin;
	Effect3DVertexProcess(In, Skin);

	float4 worldPosition = ObjectToWorldPosition(Skin.Position);
	Out.Position = WorldToClipPosition(worldPosition);
	Out.LocalPos = In.Position.xyz;
}
