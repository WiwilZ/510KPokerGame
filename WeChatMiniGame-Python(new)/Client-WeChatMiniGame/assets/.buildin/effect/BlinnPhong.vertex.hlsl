#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float3 LightDir : TEXCOORD1;
	float3 ViewDir : TEXCOORD2;
	float3 WorldNormal:TEXCOORD3;
	LIGHTMAP_COORDS(4)
	FOG_COORDS(5)
	SHADOW_COORDS(6)
};

cbuffer Material
{
	float4 _Color;
	float4 _SpecColor;
	float4 _EmissionColor;
	float4 _MainTex_ST;
	float _AlbedoIntensity;
	float _Shininess;
	float _Cutoff;
}

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
	FVertexProcessOutput Skin;
	Effect3DVertexProcess(In, Skin);

	Out.TexCoord = TRANSFER_TEXCOORD(In.TexCoord, _MainTex_ST);

	float4 worldPosition = ObjectToWorldPosition(Skin.Position);
	Out.Position = WorldToClipPosition(worldPosition);

	float3 worldSpaceViewDir = normalize(WorldSpaceViewPosition - worldPosition.xyz);
	float3 worldSpaceLightDir = WorldSpaceLightDir;
	float3 worldNormal = ObjectToWorldNormal(Skin.Normal);
	Out.WorldNormal = worldNormal;
#if defined(USE_NORMALMAP)
	// 法线贴图模式，在切线空间定义lightDir和viewDir，法线使用采样数据
	float3 worldTangent = ObjectToWorldNormal(Skin.Tangent.xyz);
	float3 worldBinormal = cross(worldTangent, worldNormal) * Skin.Tangent.w;
	// transpose
	float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);

	Out.LightDir = mul(worldToTangent, worldSpaceLightDir);
	Out.ViewDir = mul(worldToTangent, worldSpaceViewDir);
#else
	// 不使用法线贴图，则在世界空间定义lightDir和viewDir
	Out.LightDir = worldSpaceLightDir;
	Out.ViewDir = worldSpaceViewDir;
#endif

	TRANSFER_LIGHTMAP(In, Out);
	TRANSFER_SHADOW(Out, worldPosition.xyz);
	TRANSFER_FOG(Out, worldPosition.xyz);
}
