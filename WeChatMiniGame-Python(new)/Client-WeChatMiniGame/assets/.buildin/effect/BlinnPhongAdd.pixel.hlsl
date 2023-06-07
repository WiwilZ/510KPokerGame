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

DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_BumpMap);
DECLARE_TEXTURE(_SpecGlossMap);

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

fixed3 TransformTangentToWorld(fixed3 vectorTS, fixed3x3 tangentToWorld)
{
	// 行主矩阵 用右乘
	return mul(vectorTS, tangentToWorld);
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

	fixed3 viewDir = normalize(In.ViewDir);
	fixed3 normalWS = normalize(In.normalWS);
	
#if defined(USE_NORMALMAP)
	fixed3 normalTex = ReadNormal(SAMPLE_TEXTURE(_BumpMap, In.TexCoord));
	normalWS = TransformTangentToWorld(normalTex, fixed3x3(In.tangentWS, In.bitangentWS, In.normalWS));
#endif

	fixed3 tempDiffuse = fixed3(0.0, 0.0, 0.0);
    fixed3 tempSpecular = fixed3(0.0, 0.0, 0.0);
	for (int i = 0; i < MAX_LIGHT_NUM_FA; i++)
    {
        if (i < LIGHT_NUM)
        {
            Light light = GetAdditionalLight(i, In.positionWS.xyz);
            BlinnPhongLighting(light.color * light.attenuation, light.direction, normalWS, viewDir, _Shininess, tempDiffuse, tempSpecular);
            diffuse += tempDiffuse;
            specular += tempSpecular;
        } 
    }


#if defined(USE_SPECMAP)
	specular *= SAMPLE_TEXTURE(_SpecGlossMap, In.TexCoord).rgb * _SpecColor.rgb;
#else
	specular *= mainTexColor.a * _SpecColor.rgb;
#endif

	fixed4 outColor = fixed4(albedo.rgb * (diffuse + specular), albedo.a);

	APPLY_FOG(In, outColor);
	return outColor;
}
