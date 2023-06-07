#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 UVControl : TEXCOORD0;
	float2 UVSplat0 : TEXCOORD1;
	float2 UVSplat1 : TEXCOORD2;
	float2 UVSplat2 : TEXCOORD3;
	float3 LightDir : TEXCOORD5;
	float3 ViewDir : TEXCOORD6;
	float3 WorldNormal:TEXCOORD7;
	SHADOW_COORDS(8)
};

cbuffer Material
{
	float4 _SpecColor;
	float4 _Control_ST;
	float4 _Splat0_ST;
	float4 _Splat1_ST;
	float4 _Splat2_ST;
	float3 _Color;
	float _Shininess;
}

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput Effect3DProcessOut;
	Effect3DVertexProcess(In, Effect3DProcessOut);

	Out.UVControl = TRANSFER_TEXCOORD(In.TexCoord, _Control_ST);
	Out.UVSplat0 = TRANSFER_TEXCOORD(In.TexCoord, _Splat0_ST);
	Out.UVSplat1 = TRANSFER_TEXCOORD(In.TexCoord, _Splat1_ST);
	Out.UVSplat2 = TRANSFER_TEXCOORD(In.TexCoord, _Splat2_ST);

	float4 worldPosition = Effect3DProcessOut.WorldPosition;
	Out.Position = WorldToClipPosition(worldPosition);

	float3 worldSpaceViewDir = normalize(WorldSpaceViewPosition - worldPosition.xyz);
	float3 worldSpaceLightDir = WorldSpaceLightDir;
	float3 worldNormal = ObjectToWorldNormal(Effect3DProcessOut.Normal);
	Out.WorldNormal = worldNormal;

	// 不使用法线贴图，则在世界空间定义lightDir和viewDir
	Out.LightDir = worldSpaceLightDir;
	Out.ViewDir = worldSpaceViewDir;

	TRANSFER_SHADOW(Out, worldPosition.xyz);
}
