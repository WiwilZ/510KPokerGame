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

    LIGHTMAP_COORDS(6)
    FOG_COORDS(7)
    SHADOW_COORDS(8)
};

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
  FVertexProcessOutput Skin;
  Effect3DVertexProcess(In, Skin);

  float4 positionWS = ObjectToWorldPosition(Skin.Position);
  Out.positionWS = positionWS;
  Out.position = WorldToClipPosition(positionWS);
  Out.uv = TRANSFER_TEXCOORD(In.TexCoord, _MainTex_ST);
  Out.normalWS = ObjectToWorldNormal(Skin.Normal);
  
  Out.viewDirWS = SafeNormalize(WorldSpaceViewPosition - positionWS.xyz);
  
  #if defined(USE_NORMALMAP)
    Out.tangentWS = ObjectToWorldNormal(Skin.Tangent.xyz);
    Out.bitangentWS = cross(Out.tangentWS, Out.normalWS) * Skin.Tangent.w;
  #endif

  TRANSFER_LIGHTMAP(In, Out);
  TRANSFER_SHADOW(Out, positionWS.xyz);
  TRANSFER_FOG(Out, positionWS.xyz);
}
