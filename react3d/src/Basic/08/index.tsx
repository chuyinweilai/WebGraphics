// 几何体
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
  
  // 平面缓冲几何体
  const geometry = new THREE.BoxGeometry(1, 1, 100);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0x39c5bb,
  })
  // 合并几何体与材质, 填入两个材质,几何体会将材质按照顺序,对应到 groups 中。如果只设置了部分，则只显示对应的面
  const plane = new THREE.Mesh(geometry, material);
  // 加入场景中
  scene.add(plane);

  // 雾
  // 创建线性雾
  // scene.fog = new THREE.Fog(0xcccccc, 0.1, 30)
  // 指数雾
  scene.fog = new THREE.FogExp2(0x999999, 0.04)


  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(5);
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(axesHelper);

  scene.background = new THREE.Color( 0x999999 );

  return {
    scene,
    camera,
    plane,
    renderer,
    controls
  }

}

const App = () => {
  const {
    scene,
    camera,
    controls,
    renderer
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
    
    controls.update();
    renderer.render(scene, camera);
  }

  useEffect(() => {
    // 局部坐标，即以父元素的坐标为原点

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
