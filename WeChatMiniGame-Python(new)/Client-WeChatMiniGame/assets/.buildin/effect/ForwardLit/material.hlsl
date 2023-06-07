#ifndef __MATERIAL_HLSL_
    #define __MATERIAL_HLSL_
    #include "./math.hlsl"
    struct Material{
        half3 albedo;
        half3 specular;
        half  metallic;
        half  smoothness;
        half3 normalTS;
        half3 emission;
        half  occlusion;
        half  alpha;
    };

    half GetAlpha(half albedoAlpha, half4 color, half cutoff)
    {
        half alpha = albedoAlpha * color.a;

        #if defined(USE_ALPHA_TEST)
            clip(alpha - cutoff);
        #endif

        return alpha;
    }

    #if defined(_SPECULAR_SETUP)
        #define SAMPLE_METALLICSPECULAR(uv) SAMPLE_TEXTURE(_SpecGlossMap, uv)
    #else
        #define SAMPLE_METALLICSPECULAR(uv) SAMPLE_TEXTURE(_MetallicGlossMap, uv)
    #endif

    half4 GetMetallicSpecGloss(float2 uv, half albedoAlpha)
    {
        half4 specGloss;
        #if defined(USE_METALLICSPECGLOSSMAP)
            specGloss = SAMPLE_METALLICSPECULAR(uv);
            specGloss.a *= _GlossMapScale;
        #else // USE_METALLICSPECGLOSSMAP
            #if defined (_SPECULAR_SETUP)
                specGloss.rgb = _Specular.rgb;
            #else
                specGloss.rgb = _Metallic.rrr;
            #endif

            specGloss.a = _Glossiness;
        #endif

        return specGloss;
    }

    half3 GetMaterialNormal(float2 uv)
    {
        #if defined(USE_NORMALMAP)
            half4 normalTS = SAMPLE_TEXTURE(_NormalMap, uv);
            return ReadNormal(normalTS);
        #else
            return half3(0.0h, 0.0h, 1.0h);
        #endif
    }

    half GetMaterialOcclusion(float2 uv)
    {
        #if defined(USE_AOMAP)
            return SAMPLE_TEXTURE(_OcclusionMap, uv);
        #else
            return 1.0;
        #endif
    }

    half3 GetMaterialEmission(float2 uv){
        #if defined(USE_EMISSIONMAP)
            fixed4 emissionMapColor = SAMPLE_TEXTURE(_EmissionMap, uv);
            return _EmissionColor.rgb * emissionMapColor.rgb;
        #else 
            return _EmissionColor.rgb;
        #endif
    }

    void InitMaterial(float2 uv, inout Material material){
        fixed4 albedoAlpha = SAMPLE_TEXTURE(_MainTex, uv);
        material.alpha = GetAlpha(albedoAlpha.a, _Color, _Cutoff);

        half4 specGloss = GetMetallicSpecGloss(uv, albedoAlpha.a);
        material.albedo = albedoAlpha.rgb * _Color.rgb;

        #if defined (_SPECULAR_SETUP)
            material.metallic = 1.0h;
            material.specular = specGloss.rgb;
        #else
            material.metallic = specGloss.r;
            material.specular = half3(0.0h, 0.0h, 0.0h);
        #endif

        material.smoothness = specGloss.a;
        material.normalTS = GetMaterialNormal(uv);
        material.occlusion = GetMaterialOcclusion(uv);
        material.emission = GetMaterialEmission(uv);
    }

#endif