// https://tweenjs.github.io/tween.js/docs/user_guide_zh-CN.html
import {useEffect} from 'react';
import * as THREE from 'three';
import * as TWEEN from 'three/examples/jsm/libs/tween.module.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import './index.css';

// 初始化
const init = () => {
    // 创建场景
    const scene = new THREE.Scene();
    // 透视相机 fov?: number | undefined, aspect?: number | undefined, near?: number |
    // undefined, far?: number | undefined
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, // 近平面，最近可以看到哪里
            1000 // 远平面，最远可以看到哪里
    )
    // 设置相机
    camera
        .position
        .add(new THREE.Vector3(2, 2, 15))
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();

    // 创建坐标轴辅助器 size : Number 线段长度
    const axesHelper = new THREE.AxesHelper(5);
    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(axesHelper);

    // scene.background = new THREE.Color( 0x999999 );

    return {scene, camera, renderer, controls}

}

const App = () => {
    const {scene, camera, controls, renderer} = init();

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

        TWEEN.update();
    }

    // 进行重新渲染
    const render = () => {
        renderer.render(scene, camera);
    }

    // 功能函数
    const func = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 0x39c5bb})
        const box = new THREE.Mesh(geometry, material);
        box.position.x = -4;
        scene.add(box);

        // 设置动画初始位置
        const tween = new TWEEN.Tween(box.position);
        // 设置结束位置
        tween
          .to({
            x: 4
          }, 2000)
          // .repeat(Infinity)
          // 往复
          // .yoyo(true)
          // 每次运行前延迟时间
          // .delay(1000)
          .onUpdate(() => {
            // 每次更新触发
          })
          // 设置缓动
          .easing(TWEEN.Easing.Quadratic.InOut);

        
        const tween2 = new TWEEN.Tween(box.position);
        tween2.to({
          y: -4
        }, 1000);

        // 链接指定动画，在tween结束后触发
        tween
          .chain(tween2)
          .start();

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
        <div className='App'></div>
    )
}

export default App
