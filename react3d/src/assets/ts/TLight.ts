// 灯光文件
import { AmbientLight, PointLight, SpotLight } from "three";

// 环境光
const ambientLight: AmbientLight = new AmbientLight(0xFFFFFF, 0.3);

// 点光源、类似于灯泡
const pointLight: PointLight = new PointLight(0xFF00FF, 0.7, 100, 0.3);
pointLight.position.set(20, 40, 20);
pointLight.castShadow = true; // default false

// 聚光灯、类似于手电
const spotLight: SpotLight = new SpotLight(
  0xFFFFFF,
  1,
  200,
  Math.PI / 180 * 30,
  0,
  0
)
spotLight.position.set(-70, 80, -70);
spotLight.castShadow = true; // default false

export {
  ambientLight,
  pointLight,
  spotLight
}