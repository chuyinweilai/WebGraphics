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
	renderer.shadowMap.enabled = true;

	// 创建坐标轴辅助器 size : Number 线段长度
	const axesHelper = new THREE.AxesHelper(5);
	// 轨道控制器
	const controls = new OrbitControls(camera, renderer.domElement);
	scene.add(axesHelper);

	// 平面
	const material = new THREE.MeshStandardMaterial({});
	const planeGeometry = new THREE.BoxGeometry(50, 50);
	const plan = new THREE.Mesh(planeGeometry, material);
	plan.position.set(0, -1, 0);
	plan.rotation.x = -Math.PI / 2;
	plan.receiveShadow = true;
	scene.add(plan);

	// 球体
	const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
	const sphere = new THREE.Mesh(sphereGeometry, material);
	sphere.position.set(0, 0, 0);
	sphere.castShadow = true;
	sphere.receiveShadow = true;
	scene.add(sphere);

	// 小球
	const smallBall = new THREE.Mesh(
		new THREE.SphereGeometry(0.05, 20, 20), 
		new THREE.MeshBasicMaterial({ color: 0xFF0000 })
	);
	smallBall.position.set(2, 2, 2);
	scene.add(smallBall);


	// scene.background = new THREE.Color( 0x999999 );
	// 环境光
	const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2);
	scene.add(ambientLight);

	// 点光源
	const pointLight = new THREE.PointLight(0x39c5bb, 1);
	// pointLight.position.set(2, 2, 2);
	pointLight.castShadow = true;
	// 光照强度
	pointLight.intensity = 2;
	pointLight.shadow.radius = 20;
	pointLight.shadow.mapSize.set(4096, 4096);
	// 将光源添加到小球中
	smallBall.add(pointLight);


	const gui = new GUI();
	gui.add(pointLight.position, 'x').min(-5).max(5).step(0.5);
	// 光源照射的最大距离
	gui.add(pointLight, 'distance').min(0).max(10).step(0.01);
	// 沿着光照距离的衰减量
	gui.add(pointLight, 'decay').min(0).max(5).step(0.01);

	return {scene, camera, renderer, controls, smallBall}

}

const App = () => {
	const {scene, camera, controls, renderer, smallBall} = init();

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

	const clock = new THREE.Clock();

	// 渲染函数
	const animate = () => {
		const time = clock.getElapsedTime();
		smallBall.position.x = Math.sin(time) * 3;
		smallBall.position.z = Math.cos(time) * 3;
		smallBall.position.y = Math.sin(time);
		requestAnimationFrame(animate);
		controls.update();
		render();
	}

	// 进行重新渲染
	const render = () => {
		renderer.render(scene, camera);
	}

	useEffect(() => {
		// 渲染器
		renderer.setSize(window.innerWidth, window.innerHeight);
		document
			.body
			.appendChild(renderer.domElement);
		animate();
		onResizeListener();
	}, [])

	return (
		<div className='App'></div>
	)
}

export default App
