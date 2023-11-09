import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";


// 创建性能监视器
const state = new Stats();

// 创建场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth/ window.innerHeight,
	0.1,
	1000
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
	// 抗锯齿
	antialias: true
});
// 画布尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 创建坐标辅助器
const axesHelper = new THREE.AxesHelper(20);
// 创建坐标格辅助
const gridHelper = new THREE.GridHelper(10, 10, 0xFFFFFF, 'rgba(100, 100, 100, 0.5)');

scene.add(camera);
scene.add(gridHelper);
scene.add(axesHelper);

// 插入标签
const createCanvas = () => {
  const canvas: HTMLDivElement | null = document.querySelector('.canvas');
  canvas?.appendChild(renderer.domElement);
  canvas?.appendChild(state.dom);
}


export { 
  scene,
  camera,
  renderer,
  controls,
  state,
  axesHelper,
  createCanvas
}