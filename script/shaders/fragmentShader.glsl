
varying vec2 vUv;

uniform float uTime;

float rand(vec2 n) {
    return fract(sin(cos(dot(n, vec2(12.9898,12.1414)))) * 83758.5453);
}


float noise(vec2 n) {
    const vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 1.0;
    for (int i = 0; i <5; i++) {
        total += noise(n) * amplitude;
        n += n*1.7;
        amplitude *= 0.47;
    }
    return total;
}

void main(){
    const vec3 c1 = vec3(0.5, 0.0, 0.1);
    const vec3 c2 = vec3(0.9, 0.1, 0.0);
    const vec3 c3 = vec3(0.2, 0.1, 0.7);
    const vec3 c4 = vec3(1.0, 0.9, 0.1);
    const vec3 c5 = vec3(0.1);
    const vec3 c6 = vec3(0.9);
    

    vec2 speed = vec2(0.5, 1.0);

    float shift = 1.327+sin(uTime)/2.4;

    float alpha = 1.0;

    float dist = 3.5-sin(uTime)/1.89;

     
    vec2 p = vUv * dist ;
 
    
    p.x += uTime;
    float q = fbm(p - uTime * 0.3+1.0*sin(uTime+0.5)/2.0);
    
    vec2 r = vec2(fbm(p + q /2.0 + uTime * speed.x - p.x - p.y), fbm(p + q - uTime * speed.y));


    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
    
    
    vec3 color = vec3(1.0/(pow(c+1.61,vec3(4.0))) * cos(shift * vUv.y));
    
    
    color=vec3(1.0,.2,.05)/(pow((r.y+r.y)* max(.0,p.y)+0.1, 3.0));;
  
    
    color = color/(3.0+max(vec3(0),color));

    
    
    gl_FragColor = vec4(max(color.x , 0.113725), max(color.y , 0.113725), max(color.z , 0.1843137255), alpha);

}