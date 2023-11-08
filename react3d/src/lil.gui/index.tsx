// lil.gui
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import './index.css';

// 定义GUI事件
const GUIEvent = {
  FullScreen: () => {
    document.body.requestFullscreen();
  },
  ExitFullScreen: () => {
    document.exitFullscreen();
  }
}

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
  // 颜色
  const colors = {
    'miku': '#39c5bb',
  }
  
  scene.add(mesh);
  scene.add(axesHelper);
  
  const gui = new GUI();
  // 添加按钮
  gui.add(GUIEvent, 'FullScreen').name('全屏');
  gui.add(GUIEvent, 'ExitFullScreen').name('退出全屏');
  gui.add(material, 'wireframe').name('线框模式');

  gui.addColor(colors, 'miku').name('立方体颜色').onChange((val) => {
    mesh.material.color.set(val);
  })
  // 添加控制
  gui
    .add(mesh.position, 'x')
    .min(-10)
    .max(10)
    .step(1)
    .name('立方体 X 轴位置');

  return {
    scene,
    camera,
    renderer,
    mesh,
    controls
  }

}

const App = () => {
  const {
    mesh,
    scene,
    camera,
    renderer,
    controls
  } = init();

  // 添加窗口变化监听
  const onResizeListener = () => {
    window.addEventListener('resize', () => {
      // 重设渲染器宽高比
      renderer.setSize(window.innerWidth, window.innerHeight);
      // 重设相机宽高比
      camera.aspect = window.innerWidth / window.innerHeight;
      // 更新相机投影矩阵
      camera.updateProjectionMatrix();
    })
  }

  // 渲染函数
  const animate = () => {
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    
    controls.update();
    renderer.render(scene, camera);
  }

  useEffect(() => {
    // 局部坐标，即以父元素的坐标为原点
    mesh.position.set(0, 0, 0);

    // 设置相机
    camera.position.set(2, 2, 5);
    camera.lookAt(0, 0, 0);

    // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);

    document
        .body
        .appendChild(renderer.domElement);
    
    animate();

    onResizeListener();
  }, [])

  return (
    <div className='App'>
    </div>
  )
}

export default App
