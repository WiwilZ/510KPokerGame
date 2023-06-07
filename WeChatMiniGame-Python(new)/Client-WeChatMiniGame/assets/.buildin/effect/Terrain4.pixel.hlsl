#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 UVControl : TEXCOORD0;
	float2 UVSplat0 : TEXCOORD1;
	float2 UVSplat1 : TEXCOORD2;
	float2 UVSplat2 : TEXCOORD3;
	float2 UVSplat3 : TEXCOORD4;
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
	float4 _Splat3_ST;
	float3 _Color;
	float _Shininess;
}

DECLARE_TEXTURE(_Splat0);
DECLARE_TEXTURE(_Splat1);
DECLARE_TEXTURE(_Splat2);
DECLARE_TEXTURE(_Splat3);
DECLARE_TEXTURE(_Control);

// BlinnPhong 光照函数
void BlinnPhongLighting(in half3 lightColor, in half3 lightDir, in half3 normal, in half3 viewDir, in float specularFactor,
	out float3 diffuseOut, out float3 specularOut)
{
	half3 h = normalize(viewDir + lightDir);
	half ln = max(0.0, dot(+lightDir, normal));
	float nh = max(0.0, dot(h, normal));
	diffuseOut = lightColor * ln;
	specularOut = lightColor * pow(nh, specularFactor * 128.0);
}

float4 Main(in FVertexOutput In) : SV_Target0
{
	fixed4 splat_control = SAMPLE_TEXTURE (_Control, In.UVControl).rgba;

	fixed3 lay0 = SAMPLE_TEXTURE (_Splat0, In.UVSplat0).xyz;
	fixed3 lay1 = SAMPLE_TEXTURE (_Splat1, In.UVSplat1).xyz;
	fixed3 lay2 = SAMPLE_TEXTURE (_Splat2, In.UVSplat2).xyz;
	fixed3 lay3 = SAMPLE_TEXTURE (_Splat3, In.UVSplat3).xyz;

	fixed3 albedo = splat_control.r * lay0 + splat_control.g * lay1 + splat_control.b * lay2 + splat_control.a * lay3;
	albedo = albedo * _Color;
	
	fixed3 diffuse = fixed3(0.0, 0.0, 0.0);
	fixed3 specular = fixed3(0.0, 0.0, 0.0);

	half3 lightDir = normalize(In.LightDir);
	half3 viewDir = normalize(In.ViewDir);
	half3 worldspaceNormal = normalize(In.WorldNormal);

	BlinnPhongLighting(LightColor, lightDir, worldspaceNormal, viewDir, _Shininess, diffuse, specular);

	float attenuation = SHADOW_ATTENUATION(In);

	fixed3 finalDiffuse = fixed3(0.0,0.0,0.0);
#if defined(USE_LIGHTMAP)
	fixed3 lightMapColor = SAMPLE_LIGHTMAP(In);
	finalDiffuse = MixLightmapWithRealtimeAttenuation(lightMapColor, attenuation, worldspaceNormal);
#else
	finalDiffuse = fixed3(AmbientLight) + diffuse * attenuation;
#endif

	specular *= _SpecColor.rgb;

	fixed4 outColor = fixed4(albedo.rgb * (finalDiffuse + specular), 1.0);


	return outColor;
}
