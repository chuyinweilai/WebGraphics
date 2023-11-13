// 元素文件啊
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
} from 'three';
import { pictureTexture } from './TTextures';

// 地面
const stage: Mesh = new Mesh(
  new BoxGeometry(200, 10, 200),
  new MeshStandardMaterial({
    color: 0x00FFFF
  })
)
stage.position.y = -5;

// 立方体
const box: Mesh = new Mesh(
  new BoxGeometry(20, 20, 20),
  new MeshStandardMaterial({
    color: 0xFF0000
  })
)
box.position.y = 10;

// 相框
const plan = new Mesh(
  new PlaneGeometry(192, 108),
  new MeshBasicMaterial({
    map: pictureTexture,
  })
)
plan.position.set(0, 40, 0);
plan.scale.set(0.3, 0.3, 0.3);

export {
  stage,
  box,
  plan
}