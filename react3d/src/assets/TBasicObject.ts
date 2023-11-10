
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
} from 'three';

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

export default {
  stage,
  box
}