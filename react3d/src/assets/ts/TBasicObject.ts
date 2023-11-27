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
  new BoxGeometry(400, 10, 200),
  new MeshStandardMaterial({
    color: 'rgb(0, 75, 75)',
    roughness: 0
  })
)
stage.position.y = -5;
stage.castShadow = true;
stage.receiveShadow = true;

// 图片
const picture = new Mesh(
  new PlaneGeometry(192, 108),
  new MeshBasicMaterial({
    map: pictureTexture,
  })
)
picture.castShadow = true;
picture.position.set(0, 120, -40);
picture.scale.set(0.3, 0.3, 0.3);

// 相框
const plan = new Mesh(
  new BoxGeometry(210, 120, 30),
  new MeshBasicMaterial({
    color: 0x39c5bb
  })
)
plan.castShadow = true;
plan.position.set(0, 120, -50);
plan.scale.set(0.3, 0.3, 0.3);

// 墙面
const wall = new Mesh(
  new BoxGeometry(600, 200, 10),
  new MeshStandardMaterial({
    color: 0xFFFFFF
  })
)
wall.position.set(0, 100, -100);

export {
  stage,
  picture,
  plan,
  wall,
}