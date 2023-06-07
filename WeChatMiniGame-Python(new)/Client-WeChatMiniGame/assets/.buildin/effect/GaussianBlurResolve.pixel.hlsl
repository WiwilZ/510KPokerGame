#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
};

cbuffer GaussianBlur {
    float u_radius;
    float u_sampleCount;
}

DECLARE_TEXTURE(horizontalBlur);
DECLARE_TEXTURE(verticalBlur);

float4 Main(in FVertexOutput In) : SV_Target0
{
    float sd = radiusToSD(u_radius);
    if (u_sampleCount < 1.01) {
        return float4(0.5 * (SAMPLE_TEXTURE(verticalBlur, In.TexCoord).xyz + SAMPLE_TEXTURE(horizontalBlur, In.TexCoord).xyz), 1.0);
    }

    float step = 2. * u_radius / (u_sampleCount - 1.0);
    float3 sum = float3(.0, .0, .0);
    float q = .0;
    for (float i = .0; i < u_sampleCount; i += 1.) {
        float offset = -u_radius + step * i;
        float3 c1 = SAMPLE_TEXTURE(verticalBlur, uv(offset, .0, In.TexCoord)).xyz;
        float3 c2 = SAMPLE_TEXTURE(horizontalBlur, uv(.0, offset, In.TexCoord)).xyz;
        sum += (c1 + c2) * gaussian(offset, sd);
        q += gaussian(offset, sd);
    }
    return float4(sum / q / 2.0, 1.0);
}
