import {
  AxesHelper,
  GridHelper,
  PointLightHelper
} from "three";
import { pointLight } from './TLight'

// 坐标系辅助器
const axesHelper: AxesHelper = new AxesHelper(500);
// 网格辅助器
const gridHelper: GridHelper = new GridHelper(500, 10, 0x39c5bb, 0x999999);
// 点光源辅助器
const pointLightHelper: PointLightHelper = new PointLightHelper(
  pointLight,
  pointLight.distance,
  pointLight.color
);

export {
  axesHelper,
  gridHelper,
  pointLightHelper
}