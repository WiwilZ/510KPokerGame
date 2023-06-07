#include <common.inc>

cbuffer Material
{
    float4 _MainTex_ST;
    half4 _Color;
    half4 _Specular;
    half4 _EmissionColor;
    half _Cutoff;
    half _Glossiness;
    half _GlossMapScale;
    half _Metallic;
}

DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_NormalMap);
DECLARE_TEXTURE(_EmissionMap);
DECLARE_TEXTURE(_OcclusionMap);
DECLARE_TEXTURE(_SpecGlossMap);
DECLARE_TEXTURE(_MetallicGlossMap);

struct FVertexOutput
{
    float4 position : SV_Position;
    float2 uv : TEXCOORD0;
    float4 positionWS: TEXCOORD1;
    float3 normalWS: TEXCOORD2;
    float3 viewDirWS: TEXCOORD3;

    #if defined(USE_NORMALMAP)
        float3 tangentWS: TEXCOORD4;
        float3 bitangentWS: TEXCOORD5;
    #endif

    FOG_COORDS(6)
};

#include "./ForwardLit/math.hlsl"
#include "./ForwardLit/material.hlsl"
#include "./ForwardLit/input.hlsl"
#include "./ForwardLit/lit.hlsl"

float4 Main(in FVertexOutput In) : SV_Target0
{

  Material material = (Material)0;
  InitMaterial(In.uv, material);

  PixelInput pixelInput = (PixelInput)0;
  InitPixelInputAddPass(In, material.normalTS, pixelInput);

  BRDFData brdfData = (BRDFData)0;;
  InitializeBRDFData(material.albedo, material.metallic, material.specular, material.smoothness, brdfData);

  fixed3 color = fixed3(0, 0, 0);
  for (int i = 0; i < MAX_LIGHT_NUM_FA; i++)
  {
      if (i < LIGHT_NUM)
      {
        Light light = GetAdditionalLight(i, In.positionWS.xyz);
        color += LightingPhysicallyBased(brdfData, light.color, light.direction, light.attenuation, pixelInput.normalWS,  pixelInput.viewDirWS);
      } 
  }

  fixed4 finalColor = fixed4(color, material.alpha);
  
  APPLY_FOG(In, finalColor);
  
  return finalColor;
}