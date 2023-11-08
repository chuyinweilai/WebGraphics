// 几何体
import { useEffect } from 'react';
import * as THREE from 'three';

import './index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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







  // 所有的几何体都继承自 BufferGeometry 类
  // 创建三角形几何体
  const geometry = new THREE.BufferGeometry();
  
  // 创建一组32位数组
  // 所有图形都是由一组组三角形拼成，所以数组需要是三的倍数
  // const vertices = new Float32Array([
  // // 第一个三角形
  //   -1, -1, 0,
  //   1, -1, 0,
  //   1, 1, 0,
  // // 第二个三角形
  //   1, 1, 0,
  //   -1, 1, 0,
  //   -1, -1, 0
  // ])
  // // 设置几何体顶点位置，位置通过 vertices 3个数据为一组，对应三个顶点的 x,y,z
  // geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // 使用顶点索引的方式绘制
  const vertices = new Float32Array([
      -1, -1, 0,
      1, -1, 0,
      1, 1, 0,
      -1, 1, 0
  ])
  // 设置几何体顶点位置，位置通过 vertices 3个数据为一组，对应三个顶点的 x,y,z
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  // 创建索引, 对应 vertices 的下标
  const indices = new Uint16Array([
    // 第一个三角形
    0, 1, 2, 
    // 第二个三角形
    2, 3, 0
  ])
  // // 设置几何体顶点位置，位置通过 indices 每1个索引，对应一个顶点
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  // geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));



  

  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: '#39c5bb',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    side: THREE.DoubleSide
  })
  // 合并几何体与材质
  const plane = new THREE.Mesh(geometry, material);
  // 加入场景中
  scene.add(plane);

  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(5);
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(axesHelper);

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
