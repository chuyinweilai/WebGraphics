// 03-自适应以及全屏控制
import { useEffect, useState } from 'react';
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

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

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

  // 变更全屏
  const onFullScreen = async () => {
    // 是否支持全屏
    if(!document.fullscreenEnabled) return;
    if(isFullScreen) {
      // 退出全屏
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      // 全屏
      document.body.requestFullscreen()
      .then(() => setIsFullScreen(true))
      .catch(() => setIsFullScreen(false));
    }
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
      <button onClick={onFullScreen}>{isFullScreen? '退出全屏': '全屏'}</button>
    </div>
  )
}

export default App
