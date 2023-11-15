import { BufferAttribute, BufferGeometry, Mesh, MeshStandardMaterial } from "three";
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper';
import { pictureTexture } from './TTextures';

const size = 10;
// 类数组类型
const points: Float32Array = new Float32Array([
  -size, size, size,
  size, size, size,
  size, size, -size,
  -size, size, -size,

  -size, -size, size,
  size, -size, size,
  size, -size, -size,
  -size, -size, -size,
])

// 顶点索引数组
// 模型正面，参考安培定则，四指朝向三角形三个点的顺序，拇指朝向为正面
const index: number[] = [
 0, 1, 2,
 2, 3, 0,

 0, 4, 5,
 5, 1, 0,
 
 5, 6, 1,
 6, 2, 1,

 6, 7, 2,
 7, 3, 2,
 
 7, 4, 3,
 4, 0, 3,

 4, 6, 5,
 4, 7, 6
]

// 
const uv: Float32Array = new Float32Array([
  0, 0,
  1, 0,
  1, 1,
  0, 1,

  0, 0,
  1, 0,
  1, 1,
  0, 1,
])

const geometry: BufferGeometry = new BufferGeometry();

// 为当前几何体设置一个 attribute 属性,position 顶点信息，normal 法向信息
// 将类数组转化为真正的数组。js中的数组，都是类数组
// three 只能通过三角形来拼接图形，所以要绘制一个面，需要两个三角形，即六个坐标组。
// 如果不是刚好整数倍的三角形的话，会舍弃多余的点
geometry.setAttribute('position', new BufferAttribute(points, 3));
// 法向信息
geometry.setAttribute('normal', new BufferAttribute(points, 3));
// 设置 UV 坐标, 纹理上的坐标系, u为x轴，v为y周
geometry.setAttribute('uv', new BufferAttribute(uv, 2));
// 设置缓存的
geometry.setIndex(index);

const material: MeshStandardMaterial = new MeshStandardMaterial({
  color: 0xFFFFFF,
  // 渲染双面
  // side: DoubleSide，
  // map: pictureTexture
});

const codeBox: Mesh = new Mesh(geometry, material);
codeBox.position.set(-20, 20, 20);
codeBox.rotateX(Math.PI / 180 * 90);
const vertexHelper = new VertexNormalsHelper(codeBox, 10, 0x00FF00);

export {
  codeBox,
  vertexHelper
}