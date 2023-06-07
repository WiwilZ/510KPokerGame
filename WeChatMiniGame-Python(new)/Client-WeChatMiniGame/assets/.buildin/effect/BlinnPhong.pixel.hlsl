#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
	float3 LightDir : TEXCOORD1;
	float3 ViewDir : TEXCOORD2;
	float3 WorldNormal : TEXCOORD3;
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

DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_BumpMap);
DECLARE_TEXTURE(_SpecGlossMap);
DECLARE_TEXTURE(_EmissionMap);

half3 ReadNormal(half4 color)
{
	half2 normalxy = (color.rg - 0.5f) * 2.0f;
	half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
	return half3(normalxy, normalz);
}

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

	fixed4 mainTexColor = SAMPLE_TEXTURE(_MainTex, In.TexCoord);
	fixed4 texAlbedo = mainTexColor * _Color;
	fixed4 albedo = texAlbedo * _AlbedoIntensity;

#ifdef USE_ALPHA_TEST
	clip(albedo.a - _Cutoff);
#endif

	fixed3 diffuse = fixed3(0.0, 0.0, 0.0);
	fixed3 specular = fixed3(0.0, 0.0, 0.0);

	half3 lightDir = normalize(In.LightDir);
	half3 viewDir = normalize(In.ViewDir);
	half3 worldspaceNormal = normalize(In.WorldNormal);

#if defined(USE_NORMALMAP)
	half3 normalMapNormal = ReadNormal(SAMPLE_TEXTURE(_BumpMap, In.TexCoord));
	BlinnPhongLighting(LightColor, lightDir, normalMapNormal, viewDir, _Shininess, diffuse, specular);
#else
	BlinnPhongLighting(LightColor, lightDir, worldspaceNormal, viewDir, _Shininess, diffuse, specular);
#endif

	float attenuation = SHADOW_ATTENUATION(In);

	fixed3 finalDiffuse = fixed3(0.0,0.0,0.0);
#if defined(USE_LIGHTMAP)
	fixed3 lightMapColor = SAMPLE_LIGHTMAP(In);
	finalDiffuse = MixLightmapWithRealtimeAttenuation(lightMapColor, attenuation, worldspaceNormal);
#else
	finalDiffuse = fixed3(AmbientLight) + diffuse * attenuation;
#endif

#if defined(USE_SPECMAP)
		specular *= SAMPLE_TEXTURE(_SpecGlossMap, In.TexCoord).rgb * _SpecColor.rgb;
#else
	specular *= mainTexColor.a * _SpecColor.rgb;
#endif
	// 计算阴影系数

	fixed4 outColor = fixed4(albedo.rgb * (finalDiffuse + specular), albedo.a);

#if defined(USE_EMISSIONMAP)
	fixed4 emissionTexColor = SAMPLE_TEXTURE(_EmissionMap, In.TexCoord);
	fixed3 emission = _EmissionColor.rgb * emissionTexColor.r;
	outColor.rgb = outColor.rgb + emission;
#endif
	APPLY_FOG(In, outColor);
	return outColor;
}
