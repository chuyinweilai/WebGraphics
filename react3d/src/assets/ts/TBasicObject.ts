// 元素文件啊
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
} from 'three';

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


// 墙面
const wall = new Mesh(
  new BoxGeometry(1000, 200, 10),
  new MeshStandardMaterial({
    color: 0xFFFFFF
  })
)
wall.position.set(0, 100, -100);
wall.updateMatrix();
wall.updateMatrixWorld();

// wall.addEventListener('click', (event) => {
//   console.log('wall click', event);
//   (wall.material as MeshStandardMaterial).color = new Color('#39c5bb');
// })

// wall.addEventListener('mouseenter', () => {
//   console.log('wall mouseenter');
//   (wall.material as MeshStandardMaterial).color = new Color('#39c5bb');
// })
// wall.addEventListener('mousemove', () => {
//   console.log('wall mousemove');
// })
// wall.addEventListener('mouseleave', () => {
//   console.log('wall mouseleave');
//   (wall.material as MeshStandardMaterial).color = new Color('#FFFFFF');
// })

export {
  stage,
  picture,
  plan,
  wall,
}