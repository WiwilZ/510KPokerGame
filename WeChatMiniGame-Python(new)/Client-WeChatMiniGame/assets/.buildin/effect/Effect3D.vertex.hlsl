#include <common.inc>

cbuffer Material
{
	float4 _TintColor;
	float4 _MainTex_ST;
	float _Bright;
}

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float4 Color : COLOR0;
};

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput Effect3DProcessOut;
	Effect3DVertexProcess(In, Effect3DProcessOut);
	Out.TexCoord = TRANSFER_TEXCOORD(Effect3DProcessOut.TexCoord, _MainTex_ST);
	Out.Position = WorldToClipPosition(Effect3DProcessOut.WorldPosition);
	Out.Color = Effect3DProcessOut.Color;
}