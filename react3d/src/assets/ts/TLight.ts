import { AmbientLight, PointLight } from "three";

// 环境光
const ambientLight: AmbientLight = new AmbientLight(0xFFFFFF, 0.3);

// 点光源
const pointLight: PointLight = new PointLight(0xFF00FF, 0.7, 100, 0.3);
pointLight.position.set(20, 20, 20);

export {
  ambientLight,
  pointLight
}