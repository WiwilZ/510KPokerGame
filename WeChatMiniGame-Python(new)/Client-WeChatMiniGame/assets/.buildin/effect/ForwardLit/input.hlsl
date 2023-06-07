#ifndef __INPUT_HLSL_
    #define __INPUT_HLSL_
    #include "math.hlsl"

    struct PixelInput
    {
        float3  positionWS;
        half3   normalWS;
        half3   viewDirWS;
        half3   bakedGI;
        fixed   shadowAtten;
    };

    void InitPixelInput(FVertexOutput input, fixed3 normalTS, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = normalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMALMAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #endif

        // shadow
        pixelInput.shadowAtten = SHADOW_ATTENUATION(input);

        // gi
        #ifdef LIGHTMAP_ON
            fixed3 lightMapColor = SAMPLE_LIGHTMAP(input);
            pixelInput.bakedGI = MixLightmapWithRealtimeAttenuation(lightMapColor, pixelInput.shadowAtten, pixelInput.normalWS);
        #else
            pixelInput.bakedGI = ShadeSH9(pixelInput.normalWS);
        #endif
    }

    void InitPixelInputAddPass(FVertexOutput input, fixed3 normalTS, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = normalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMALMAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = normalize(pixelInput.normalWS);
        #endif
    }

#endif