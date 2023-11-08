// 几何体
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// GLTF 加载器

import './index.css';
// HDR 加载器
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// GLTF 加载器
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// KTX2 加载器
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
// DRACO 加载器
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
// ？？
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

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
  const func = () => {

    const gltfLoader = new GLTFLoader();

    // 加载GLTF模型
    gltfLoader.load(
      // 模型路径
      './../../public/models/gltf/Michelle.glb',
      // 加载完成后回调
      (gltf) => {
        scene.add(gltf.scene);
      }
    );

    // 配置 ktx2 加载器参数
    const ktx2Loader = new KTX2Loader()
    ktx2Loader
      .setTranscoderPath( './../../public/libs/basis' ) // 设置解析器路径
      .detectSupport( renderer );
    // 配置 KTX2 加载器到 GLTF
    // gltfLoader
    //   .setKTX2Loader( ktx2Loader.dispose() )
    //   .setMeshoptDecoder( MeshoptDecoder )
    //   .load( './../../public/models/gltf/collision-world.glb', ( gltf ) => {
    //   gltf.scene.position.x = 3;
    //   gltf.scene.position.y = -0.8;
    //   gltf.scene.position.z = 5;
    //   scene.add( gltf.scene );
    // } );

    // 加载 DRACO 模型
    const dracoLoader = new DRACOLoader();
    // 设置解析器路径
    dracoLoader.setDecoderPath('./../../public/libs/draco')
    // 配置 DRACO 加载器到 GLTF
    gltfLoader
      .setDRACOLoader(dracoLoader)
      .load(
        './../../public/models/gltf/Flamingo.glb', ( draco ) => {
        console.log('draco', draco)
        scene.add( draco.scene );
      } );
    
    // 添加环境贴图
    new RGBELoader()
      .setPath( './../../public/textures/equirectangular/' )
      .load( 'pedestrian_overpass_1k.hdr', ( envMap ) => {
        console.log('envMap', envMap)
        // 设置球形映射
        envMap.mapping = THREE.EquirectangularReflectionMapping;
        // 设置环境背景
        // scene.background = envMap;
        // 设置纹理贴图，将会被设为场景中所有物理材质的环境贴图
        scene.environment = envMap;

        render();
      } );
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

    // 功能函数
    func()
  }, [])

  return (
    <div className='App'>
    </div>
  )
}

export default App
