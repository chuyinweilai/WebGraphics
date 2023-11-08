/**
 * 灯光与阴影
 * 1、材质对光照要有反应
 * 2、渲染器打开阴影计算 renderer.shadowMao.enabled = true;
 * 3、设置光照投影阴影 directionalLight.castShadow = true;
 * 4、设置物体投射阴影 sphere.castShadow = true;
 * 5、设置物体接收阴影 plan.receiveShadow = true;
 *  */ 

import {useEffect} from 'react';
import * as THREE from 'three';
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
	}

	// 进行重新渲染
	const render = () => {
		renderer.render(scene, camera);
	}

	// 功能函数
	const func = () => {
			
			const geometry = new THREE.SphereGeometry(1, 20, 20);
			const material = new THREE.MeshStandardMaterial();
			const box = new THREE.Mesh(geometry, material);
			scene.add(box);

			// 添加环境光
			const light = new THREE.AmbientLight(0xFFFFFF, 0.1);
			scene.add(light);
			// 添加直射光
			const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
			directionalLight.position.set(10, 10, 10)
			scene.add(directionalLight);

			// 创建平面
			const planeGeometry = new THREE.PlaneGeometry(10, 10);
			const plan = new THREE.Mesh(planeGeometry, material);
			plan.position.set(0, -1, 0);
			plan.rotation.x = -Math.PI / 2;
			scene.add(plan);

			// 设置灯光阴影
			renderer.shadowMap.enabled = true;
			// 打开对应元素的阴影贴图
			directionalLight.castShadow = true;
			box.castShadow = true;
			// 打开元素接受阴影
			box.receiveShadow = true;
			plan.receiveShadow = true;


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
