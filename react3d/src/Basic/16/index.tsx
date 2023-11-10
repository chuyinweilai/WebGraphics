/**
 * 聚光灯
 *  */ 

import {useEffect, useRef} from 'react';

import { TEngine } from '../../assets/TEngine';
import TBasicObjectList from '../../assets/TBasicObject';
import TLightList from '../../assets/TLight';
import './index.css';

const App = () => {
	const threeCanvas = useRef(null);
	const TE = useRef<TEngine | null>(null);

	useEffect(() => {
		TE.current = new TEngine(threeCanvas.current!);
		TE.current.addObject(...Object.values(TBasicObjectList));
		TE.current.addObject(...Object.values(TLightList));
	}, [])


	return (
		<div className='three-canvas' ref={threeCanvas}></div>
	)
}

export default App
