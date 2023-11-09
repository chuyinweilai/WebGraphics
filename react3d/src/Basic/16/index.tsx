/**
 * 聚光灯
 *  */ 

import {useEffect, useRef} from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import './index.css';
import { TEngine } from '../../assets/TEngine';

const App = () => {
	const threeCanvas = useRef(null);
	const TE = useRef<TEngine | null>(null);

	useEffect(() => {
		TE.current = new TEngine(threeCanvas.current!);
	}, [])


	return (
		<div className='three-canvas' ref={threeCanvas}></div>
	)
}

export default App
