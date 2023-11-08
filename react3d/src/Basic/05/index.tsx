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
  // 创建几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  console.log(geometry);

  // 划分顶点组, 填入索引进行划分
  // 几何体默认按照面来划分组，比如正方体有6组。但如果使用了 addGroup 则会额外添加对应的分组
  // geometry.addGroup(0, 3, 0);
  // geometry.addGroup(3, 3, 1);

  // 创建材质两个材质
  const material_0 = new THREE.MeshBasicMaterial({
    color: '#39c5bb',
    // wireframe: true,
  })
  const material_1 = new THREE.MeshBasicMaterial({
    color: '#31FF00',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    // side: THREE.DoubleSide
  })
  const material_2 = new THREE.MeshBasicMaterial({
    color: '#F0530F',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    // side: THREE.DoubleSide
  })
  const material_3 = new THREE.MeshBasicMaterial({
    color: '#2100FF',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    // side: THREE.DoubleSide
  })
  const material_4 = new THREE.MeshBasicMaterial({
    color: '#F86F00',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    // side: THREE.DoubleSide
  })
  const material_5 = new THREE.MeshBasicMaterial({
    color: '#77F00F',
    // 图形是分正反面的，只有设置了 DoubleSide 才可以两面看到
    // side: THREE.DoubleSide
  })
  console.log(geometry)



  // 合并几何体与材质, 填入两个材质,几何体会将材质按照顺序,对应到 groups 中。如果只设置了部分，则只显示对应的面
  const plane = new THREE.Mesh(geometry, [material_0, material_1, material_2, material_3, material_4, material_5]);
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
