import { useEffect } from 'react';
import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import './index.css';
import { onResizeListener } from './../units';
import { 
	state,
	scene,
	camera,
	renderer,
	controls,
	createCanvas,
} from './../init';


const App = () => {

	const render = () => {
		renderer.render(scene, camera);
	}

	const animate = () => {
		requestAnimationFrame(animate);
		controls.update();
		state.update();
		render();
		// state.end();
	}

	// 初始化
	const init = () => {
		// 调整性能监视器样式
		state.dom.style.right = '5px';
		state.dom.style.left = 'unset';
		// 相机
		camera.position.set(-3.25, 2.98, 4.06);
		camera.lookAt(0,0,0);
		// camera.updateProjectionMatrix();

		// 创建一个物体
		const boxGeometry = new THREE.BoxGeometry(1, 1 ,1);
		const boxMaterial = new THREE.MeshBasicMaterial({
			color: 0x999999
		});
		const box = new THREE.Mesh(boxGeometry, boxMaterial);
		box.position.set(0, 0, 0);
		scene.add(box);

		animate();
	}

	useEffect(() => {
		init();
		createCanvas();
		onResizeListener(renderer, camera);
	}, [])

	return (
		<div className='canvas'></div>
	)
}

export default App
