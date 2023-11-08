import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import './index.css';

// 初始化
const init = () => {
  // 创建场景
  const scene = new THREE.Scene();
  // 透视相机 fov?: number | undefined, aspect?: number | undefined, near?: number |
  // undefined, far?: number | undefined
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1, // 近平面，最近可以看到哪里
    1000 // 远平面，最远可以看到哪里
  )
  const renderer = new THREE.WebGLRenderer();
  // 创建几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 材质
  const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  // 创建网格
  const mesh = new THREE.Mesh(geometry, material);

  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(5);

  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 带阻尼的控制
  controls.enableDamping = true;
  // 阻尼系数
  controls.dampingFactor = 0.01;
  // 自动旋转
  controls.autoRotate = true;
  
  scene.add(mesh);
  scene.add(axesHelper);

  return {
    scene,
    camera,
    renderer,
    mesh,
    controls
  }

}

function App() {
  const {
    scene,
    camera,
    renderer,
    controls
  } = init();

  // 渲染函数
  const animate = () => {
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
  }

  useEffect(() => {
    // 设置相机
    camera.position.set(2, 2, 5);
    camera.lookAt(0, 0, 0);

    // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
        .body
        .appendChild(renderer.domElement);
    animate();
  }, [])

  return (
    <div className='App' />
  )
}

export default App
