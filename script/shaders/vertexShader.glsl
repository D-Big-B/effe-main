
varying vec2 vUv ;

void main(){
    gl_Position = vec4(position,1.0);

    vUv  = vec2(uv.y,1.0 - uv.x);
}