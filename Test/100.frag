// okay
#version 100
int a[3] = { 2, 3, 4, };  // ERROR

int uint;

attribute vec4 v[3];     // ERROR

float f = 2;             // ERROR

uniform block {          // ERROR
    int x;
};

void foo(float);

void main()
{
    foo(3);              // ERROR
    int s = 1 << 4;      // ERROR
    s = 16 >> 2;         // ERROR
    if (a == a);         // ERROR
    int b, c;
    b = c & 4;           // ERROR
    b = c % 4;           // ERROR
    b = c | 4;           // ERROR
    b >>= 2;             // ERROR
    b <<= 2;             // ERROR
    b %= 3;              // ERROR

    struct S {
        float f;
        float a[10];
    } s1, s2;

    s1 = s2;             // ERROR
    if (s1 == s2);       // ERROR
    if (s1 != s2);       // ERROR

    switch(b) {          // ERROR
    }
}

invariant gl_FragColor;
float fa[];              // ERROR
float f13;
invariant f13;           // ERROR
struct S { int a; };
invariant S;
invariant float fi;      // ERROR
varying vec4 av;
invariant av;            // okay in v100

void foo10()
{
    invariant f;         // ERROR
    invariant float f2;  // ERROR
    float f3;
    invariant f3;        // ERROR
}

uniform vec2 uv2;
invariant uv2;              // ERROR
invariant uniform vec3 uv3; // ERROR

sampler2D glob2D;           // ERROR
void f11(sampler2D p2d)
{
    sampler2D v2D;          // ERROR
}
varying sampler2D vary2D;   // ERROR

struct sp {
    highp float f;
    in float g;             // ERROR
    uniform float h;        // ERROR
    invariant float i;      // ERROR
};

uniform sampler3D s3D;      // ERROR

#extension GL_OES_texture_3D : enable

precision highp sampler3D;
uniform sampler3D s3D2;

void foo234()
{
    texture3D(s3D2, vec3(0.2), 0.2);
    texture3DProj(s3D2, v[1], 0.4);
    dFdx(v[0]);    // ERROR
    dFdy(3.2);     // ERROR
    fwidth(f13);   // ERROR
}

#extension GL_OES_standard_derivatives : enable

void foo236()
{
    dFdx(v[0]);
    dFdy(3.2);
    fwidth(f13);
    gl_FragDepth = f13;    // ERROR
    gl_FragDepthEXT = f13; // ERROR
}

#extension GL_EXT_frag_depth : enable

void foo239()
{
    gl_FragDepth = f13;    // ERROR
    gl_FragDepthEXT = f13;
}

#extension GL_OES_EGL_image_external : enable

uniform samplerExternalOES sExt;

void foo245()
{
    texture2D(sExt, vec2(0.2));
    texture2DProj(sExt, vec3(f13));
    texture2DProj(sExt, v[2]);
}

precision mediump samplerExternalOES;
uniform samplerExternalOES mediumExt;
uniform highp samplerExternalOES highExt;

void foo246()
{
    texture2D(mediumExt, vec2(0.2));
    texture2DProj(highExt, v[2]);
    texture3D(sExt, vec3(f13));   // ERROR
    texture2DProjLod(sExt, vec3(f13), f13);  // ERROR
    int a;
    ~a;    // ERROR
    a | a; // ERROR
    a & a; // ERROR
}

#extension GL_OES_EGL_image_external : disable
uniform sampler2D s2Dg;

int foo203940(int a, float b, float a)  // ERROR, a redefined
{
    texture2DProjGradEXT(s2Dg, vec3(f13), uv2, uv2);  // ERROR, extension not enabled
    return a;
}

float f123 = 4.0f;   // ERROR
float f124 = 5e10F;  // ERROR

#extension GL_EXT_shader_texture_lod : enable

uniform samplerCube sCube;

void foo323433()
{
    texture2DLodEXT(s2Dg, uv2, f13);
    texture2DProjGradEXT(s2Dg, vec3(f13), uv2, uv2);
    texture2DGradEXT(s2Dg, uv2, uv2, uv2);
    textureCubeGradEXT(sCube, vec3(f13), vec3(f13), vec3(f13));
}

uniform samplerExternalOES badExt;  // syntax ERROR
