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
  // 设置相机
  camera.position.add(new THREE.Vector3(2, 2, 15))
  camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer();
  
  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(5);
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(axesHelper);

  // scene.background = new THREE.Color( 0x999999 );
  


  return {
    scene,
    camera,
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
    render();
  }

  // 进行重新渲染
  const render = () => {
    renderer.render( scene, camera );
  }

  // 功能函数
  const func = () => {
    const sphere_1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x39c5bb
      })
    )
      const sphere_2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0000FF
      })
    )
    const sphere_3 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xFF00FF
      })
    )

    sphere_1.position.x = 0;
    sphere_2.position.x = -4;
    sphere_3.position.x = 4;

    scene.add(sphere_1);
    scene.add(sphere_2);
    scene.add(sphere_3);

    // 创建射线
    const raycaster = new THREE.Raycaster();
    // 创建二维向量，保存鼠标点击位置
    const mouse = new THREE.Vector2();
      
    // 监听窗口
    window.addEventListener('click', (e) => {
      // 将屏幕坐标转化为坐标系坐标
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
      // 通过摄像机和鼠标坐标，更新射线
      raycaster.setFromCamera(mouse, camera);

      // 计算射线与物体交点
      // intersects 为在射线上的所有物体数组，由近到远排列
      const intersects = raycaster.intersectObjects([sphere_1, sphere_2, sphere_3]);
      // 针对物体进行处理
      if(intersects[0]){
        if(intersects[0].object._isSelect){
          intersects[0].object._isSelect = false;
          intersects[0].object.material.color.set(intersects[0].object._originColor);
        } else {
          intersects[0].object._isSelect = true;
          intersects[0].object._originColor = intersects[0].object.material.color.getHex();
          intersects[0].object.material.color.set(0x33ff66);
        }
      }
    })

    render();
  }

  useEffect(() => {
    // 渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
        .body
        .appendChild(renderer.domElement);
    animate();
    onResizeListener();
    // 功能函数
    func()
  }, [])

  return (
    <div className='App'>
    </div>
  )
}

export default App
