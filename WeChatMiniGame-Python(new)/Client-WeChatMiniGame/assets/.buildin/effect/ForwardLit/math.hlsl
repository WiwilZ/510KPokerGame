
#ifndef __MATH_HLSL_
#define __MATH_HLSL_

#define FLT_MAX  3.402823466e+38 // Maximum representable floating-point number
#define HALF_MIN 6.103515625e-5
#define kDieletricSpec half4(0.04, 0.04, 0.04, 1.0 - 0.04)

#define PositivePow(a,b) pow(a,b)

fixed3 TransformTangentToWorld(fixed3 vectorTS, fixed3x3 tangentToWorld)
{
    return mul(tangentToWorld, vectorTS);
}

inline half3 ReadNormal(half4 color)
{
    half2 normalxy = (color.rg - 0.5f)*2.0f;
    half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
    return half3(normalxy, normalz);
}

float pow5( float x )
{
	float xx = x*x;
	return xx * xx * x;
}

half pow4(half x){
    half xx = x*x;
    return xx*xx;
}

#endif//__MATH_H_