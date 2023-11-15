/* eslint-disable @typescript-eslint/no-explicit-any */
// 02-位移
import { useEffect, useRef } from 'react';
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
	// 设置相机
	camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
	camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer();

  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(100);
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);

  scene.add(axesHelper);

  return {
    scene,
    camera,
    renderer,
    controls
  }

}

function App() {
    // 需要变化的对象组
  const objects = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhongMaterial, THREE.Object3DEventMap>>([]);
  const {
    scene,
    camera,
    renderer,
    controls
  } = init();

	// 进行重新渲染
	const render = () => {
		renderer.render(scene, camera);
	}
  
  // 功能函数
  const func = () => {

    // 设置光源
    const color = 0xffffff;
    const intensity = 500;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);

    // 创建球体
    const geometry = new THREE.SphereGeometry(1, 6, 6);
    // 设置太阳的材质
    // 材质的放射属性（emissive）是基本上不受其他光照影响的固有颜色。光照会被添加到该颜色上。
    const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0x00ff00 });
    // 创建太阳网格
    const sunMesh = new THREE.Mesh(geometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    scene.add(sunMesh);

    objects.current.push(sunMesh);
    
    render();
  }

  // 循环效果
  const loopAct = (time = 0) => {
		time *= 0.001;
    if(objects.current?.length){
      objects.current.forEach((obj: any) => {
        obj.rotation.y = time;
      });
    }
  }

  // 渲染函数
  const animate = ( time = 0 ) => {
    requestAnimationFrame(animate);
    controls.update();
    render();
    loopAct(time)
  }
  
  useEffect(() => {
    // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
        .body
        .appendChild(renderer.domElement);
    animate();

		// 功能函数
		func()
  }, [])

  return (
    <div className='App' />
  )
}

export default App
