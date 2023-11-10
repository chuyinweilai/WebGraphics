import { AmbientLight, PointLight } from "three";

// 环境光
const ambientLight: AmbientLight = new AmbientLight(0xFFFFFF, 0.3);

// 点光源
const pointLight: PointLight = new PointLight(0xFFFFFF, 0.7, 200, 0.1);
pointLight.position.set(20, 20, 20);
// pointLight.lookAt(0, 0, 0);

export default {
  ambientLight,
  pointLight
}