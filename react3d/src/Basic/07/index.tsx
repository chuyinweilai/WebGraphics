// 几何体
import { useEffect } from 'react';
import * as THREE from 'three';

import './index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

// 初始化
const init = () => {
  // 引入 GUI 控制器
  const gui = new GUI();
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


  // 创建纹理加载器
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    // 资源URL
    './../../public/texture/pngpai.png',

    // onLoad回调
    ( texture ) => {
      // in this example we create the material when the texture is loaded
      console.log('texture', texture)
    },

    // 目前暂不支持onProgress的回调
    undefined,

    // onError回调
    ( err ) => {
      console.error( 'An error happened.', err);
    }
  );

  const texture2 = textureLoader.load(
    './../../public/texture/R.jpeg',
  )
  
  texture2.colorSpace = THREE.SRGBColorSpace;
  
  // 平面缓冲几何体
  const geometry = new THREE.PlaneGeometry(1, 1);
  // 创建材质
  const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    // 设置纹理贴图
    map: texture2,
    // // ao贴图
    // aoMap: texture,
    // // ao 贴图强度
    // aoMapIntensity: 1,
    // 透明度贴图
    alphaMap: texture,
    // 允许透明
    transparent: true
  })
  // 合并几何体与材质, 填入两个材质,几何体会将材质按照顺序,对应到 groups 中。如果只设置了部分，则只显示对应的面
  const plane = new THREE.Mesh(geometry, material);
  // 加入场景中
  scene.add(plane);


  // 创建坐标轴辅助器
  // size : Number 线段长度
  const axesHelper = new THREE.AxesHelper(5);
  // 轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(axesHelper);

  gui.add(material, 'transparent').name('透明');
  gui.add(material, 'aoMapIntensity').name('ao 贴图强度').min(0).max(9);
  gui.add(texture2, 'colorSpace', {
    sRGB: THREE.SRGBColorSpace,
    linear: THREE.LinearSRGBColorSpace
  }).onChange(() => {
    texture2.needsUpdate = true;
  })


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
