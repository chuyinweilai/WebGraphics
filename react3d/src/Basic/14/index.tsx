/**
 * 聚光灯
 *  */ 

import {useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

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
		.add(new THREE.Vector3(0, 10, 0))
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
	}

	// 进行重新渲染
	const render = () => {
		renderer.render(scene, camera);
	}
	
	const onMouseMove = (sphere: any) => {
		window.addEventListener('mousemove', ({ offsetX, offsetY }) => {
			const mouse = {
				x: 0,
				y: 0
			}
      mouse.x = ((offsetX / window.innerWidth) * 2 - 1) * 4;
      mouse.y = ((offsetY / window.innerHeight) * 2 - 1) * 4;
			sphere.position.set(mouse.x, 0, mouse.y);

			
		})
	}
	// 功能函数
	const func = () => {
			
			const geometry = new THREE.SphereGeometry(1, 20, 20);
			const material = new THREE.MeshStandardMaterial({});
			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(0, 0, 0);
			// 打开元素接受阴影
			sphere.castShadow = true;
			sphere.receiveShadow = true;

			// 创建平面
			const planeGeometry = new THREE.PlaneGeometry(50, 50);
			const plan = new THREE.Mesh(planeGeometry, material);
			plan.position.set(0, -1, 0);
			plan.rotation.x = -Math.PI / 2;
			plan.receiveShadow = true;

			// 设置灯光阴影
			renderer.shadowMap.enabled = true;
			// 渲染物理光照模式
			// renderer.phy

			// 添加环境光
			const light = new THREE.AmbientLight(0xFFFFFF, 0.1);

			// 添加聚光灯
			const spotLight = new THREE.SpotLight(0xFFFFFF, 0.5);
			spotLight.position.set(5, 5, 5)
			// 打开阴影贴图
			spotLight.castShadow = true;
			// 模糊阴影的边缘。
			spotLight.shadow.radius = 20;
			// 阴影的贴图分辨率
			spotLight.shadow.mapSize.set(4096, 4096)
			// 聚光灯角度
			spotLight.angle = Math.PI / 6;
			// 聚光灯目标，朝着该目标照射
			spotLight.target = sphere;
			// 聚光灯衰减
			spotLight.distance = 0;

			const gui = new GUI();
			gui.add(sphere.position, 'x').min(-5).max(5).step(0.5);
			gui.add(spotLight, 'distance').min(0).max(20).step(0.01);
			gui.add(spotLight, 'penumbra').min(0).max(1).step(0.01);
			gui.add(spotLight, 'angle').min(0).max(Math.PI / 2).step(0.1)
			.onChange(() => {
				spotLight.shadow.camera.updateProjectionMatrix();
			});

			scene.add(sphere);
			scene.add(plan);
			scene.add(light);
			scene.add(spotLight);
			render();
	}

	useEffect(() => {
		// 渲染器
		renderer.setSize(window.innerWidth, window.innerHeight);
		document
			.body
			.appendChild(renderer.domElement);
		// 功能函数
		func();
		animate();
		onResizeListener();
	}, [])

	return (
		<div className='App'></div>
	)
}

export default App
