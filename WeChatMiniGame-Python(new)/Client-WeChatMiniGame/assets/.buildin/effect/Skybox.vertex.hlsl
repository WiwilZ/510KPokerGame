#include <common.inc>

struct FVertexInput
{
	float3 Position : a_position;
};

cbuffer Material
{
	float4 _TintColor;
    float _Exposure;
    float _Rotation;
}

struct FVertexOutput
{
	float4 Position : SV_Position;
    float3 pos: TEXCOORD0;
};

// 当camera type是ortho的时候，使用以下三个来代替u_projection
static const float fov_ = 0.25 * 3.1415926;
static const float aspect_ = 1.0;
static const float4x4 ortho_matrix = {
    1.0 / (aspect_ * tan(fov_ * .5)), 0, 0, 0,
    0, 1.0 / tan(fov_ * .5), 0, 0,
    0, 0, -1.0, -1.0,
    0, 0, 0, 0 
};

void Main(in FVertexInput In, out FVertexOutput Out)
{

    float4 after_rotation = {
        cos(_Rotation) * In.Position.x - sin(_Rotation) * In.Position.z,
        In.Position.y,
        sin(_Rotation) * In.Position.x + cos(_Rotation) * In.Position.z,
        1.0
    };

    float4x4 u_view_without_translate = u_view;
    u_view_without_translate[3][0] = 0;
    u_view_without_translate[3][1] = 0;
    u_view_without_translate[3][2] = 0;
    
    float3 camera_based_pos = mul(u_view_without_translate, after_rotation).xyz;
    float3 normalized_pos = normalize(camera_based_pos);

    // 判断是否是orhto
    if (abs(u_projection[3][3]) < 1e-4) {
        Out.Position = mul(u_projection, float4(normalized_pos, 1.0));
    } else {
        Out.Position = mul(ortho_matrix, float4(normalized_pos, 1.0));
    }
    Out.Position.z = Out.Position.w;
    Out.pos = In.Position;
}