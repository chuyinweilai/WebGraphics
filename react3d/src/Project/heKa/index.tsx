import { useEffect } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import './index.css';

// 创建场景
const scene = new THREE.Scene();
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth/ window.innerHeight,
	0.1,
	1000
);
// 创建渲染器
const renderer = new THREE.WebGLRenderer({
	// 抗锯齿
	antialias: true
});
// 画布尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
document.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

const App = () => {

	// 初始化
	const init = () => {
		// 场景

		// 相机
		camera.position.set(-3.25, 2.98, 4.06);
		camera.lookAt(0,0,0);
		// camera.updateProjectionMatrix();



	}

	useEffect(() => {
		init()
	}, [])

	return (
		<div className='container'></div>
	)
}

export default App
