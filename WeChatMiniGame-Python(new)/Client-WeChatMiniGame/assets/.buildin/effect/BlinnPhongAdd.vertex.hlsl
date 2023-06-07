#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float3 ViewDir : TEXCOORD1;
	float3 normalWS: TEXCOORD2;
	float4 positionWS: TEXCOORD3;
	FOG_COORDS(4)
#if defined(USE_NORMALMAP)
	float3 tangentWS: TEXCOORD5;
	float3 bitangentWS: TEXCOORD6;
#endif
};

cbuffer Material
{
	float4 _Color;
	float4 _SpecColor;
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
	Out.positionWS = worldPosition;
	Out.Position = WorldToClipPosition(worldPosition);

	Out.ViewDir = normalize(WorldSpaceViewPosition - worldPosition.xyz);
	float3 normalWS = ObjectToWorldNormal(Skin.Normal);
	Out.normalWS = normalWS;

#if defined(USE_NORMALMAP)
	// 法线贴图模式，定义TBN矩阵
	float3 tangentWS = ObjectToWorldNormal(Skin.Tangent.xyz);
	float3 bitangentWS = cross(tangentWS, normalWS) * Skin.Tangent.w;
	Out.tangentWS = tangentWS;
	Out.bitangentWS = bitangentWS;
#endif

	TRANSFER_FOG(Out, worldPosition.xyz);
}
