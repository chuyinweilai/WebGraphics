// 元素文件啊
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
} from 'three';
// 法线辅助器
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { pictureTexture } from './TTextures';

// 地面
const stage: Mesh = new Mesh(
  new BoxGeometry(200, 10, 200),
  new MeshStandardMaterial({
    color: 'rgb(0, 75, 75)',
    roughness: 0
  })
)
stage.position.y = -5;
stage.castShadow = true;
stage.receiveShadow = true;

// 立方体
const box: Mesh = new Mesh(
  new BoxGeometry(20, 20, 20),
  new MeshStandardMaterial({
    color: 0xFFFFFF,
  // 材质与金属的相似度
    // metalness: 1,
    // 材质的粗糙程度
    // roughness: 0.5

  })
)
box.position.x = 20;
box.position.y = 10;
box.castShadow = true;
box.receiveShadow = true;

// 相框
const plan = new Mesh(
  new PlaneGeometry(192, 108),
  new MeshBasicMaterial({
    map: pictureTexture,
  })
)
plan.castShadow = true;
plan.position.set(0, 40, 0);
plan.scale.set(0.3, 0.3, 0.3);

const vertexHelper = new VertexNormalsHelper(box, 10, 0x00FF00);

export {
  stage,
  box,
  plan,
  vertexHelper
}