/**
 * 聚光灯
 *  */ 

import {useEffect, useRef} from 'react';

import { TEngine } from '../../assets/ts/TEngine';
import * as TBasicObjectList from '../../assets/ts/TBasicObject';
import * as TLightList from '../../assets/ts/TLight';
import * as THelperList from '../../assets/ts/THelper';
import * as TCodeModel from '../../assets/ts/TCodeModel';
import { getFemale, getCerberus } from '../../assets/ts/TLoaderModel';
import './index.css';
import { groupPromise } from '../../assets/ts/TGroup';

const App = () => {
	const threeCanvas = useRef(null);
	const TE = useRef<TEngine | null>(null);

	useEffect(() => {
		TE.current = new TEngine(threeCanvas.current!);
		TE.current.addObject(...Object.values(TLightList));
		TE.current.addObject(...Object.values(THelperList));
		TE.current.addObject(...Object.values(TBasicObjectList));
		groupPromise.then(group => {
			group && TE.current!.addObject(group);
		})
		// TE.current.addObject(...Object.values(TCodeModel));
		// getFemale().then(group => {
		// 	group && TE.current!.addObject(group);
		// })
		// getCerberus().then(group => {
		// 	group && TE.current!.addObject(group);
		// })

			
	}, [])


	return (
		<div className='three-canvas' ref={threeCanvas}></div>
	)
}

export default App
