import {
  AxesHelper,
  GridHelper,
  PointLightHelper,
  SpotLightHelper
} from "three";
import { spotLight, pointLight } from "./TLight";

// 坐标系辅助器
const axesHelper: AxesHelper = new AxesHelper(500);
// 将该方法置空，防止射线捕捉到辅助器
axesHelper.raycast = () => {};
// 网格辅助器
const gridHelper: GridHelper = new GridHelper(500, 10, 0x39c5bb, 0x999999);
gridHelper.raycast = () => {};
// 点光源辅助器
const pointLightHelper: PointLightHelper = new PointLightHelper(
  pointLight,
  pointLight.distance,
  pointLight.color
);
pointLightHelper.raycast = () => {};

const spotLightHelper: SpotLightHelper = new SpotLightHelper(spotLight, spotLight.color);
spotLightHelper.raycast = () => {};

export {
  axesHelper,
  gridHelper,
  // pointLightHelper
  spotLightHelper
}