/**
 * 聚光灯
 *  */ 

import {useEffect, useRef} from 'react';

import { TEngine } from '../../assets/ts/TEngine';
import * as TBasicObjectList from '../../assets/ts/TBasicObject';
import * as TLightList from '../../assets/ts/TLight';
import * as THelperList from '../../assets/ts/THelper';
import * as TCodeModel from '../../assets/ts/TCodeModel';
import './index.css';
import { cerberusMaterial, cerberusPromise, femalePromise } from '../../assets/ts/TLoaderModel';
import { Material, Mesh } from 'three';

const App = () => {
	const threeCanvas = useRef(null);
	const TE = useRef<TEngine | null>(null);

	useEffect(() => {
		TE.current = new TEngine(threeCanvas.current!);
		TE.current.addObject(...Object.values(TLightList));
		TE.current.addObject(...Object.values(THelperList));
		// TE.current.addObject(...Object.values(TBasicObjectList));
		TE.current.addObject(...Object.values(TCodeModel));
		femalePromise
			.then((group) => {
				group.scale.set(0.5, 0.5, 0.5);
				group.position.z = 10;
				// TE.current?.addObject(group)
			})
			.catch(e => console.log(e));

		cerberusPromise
			.then((group) => {
				const cerberusMesh: Mesh = group.children[0] as Mesh;
				// 先清空材质
				(cerberusMesh.material as Material).dispose();
				// 再设置材质
				cerberusMesh.material = cerberusMaterial;

				group.scale.set(20, 20, 20);
				group.rotateY(Math.PI);
				group.position.set(-10, 50, 0);
				
				TE.current?.addObject(group)
			})
			.catch(e => console.log(e));
			
	}, [])


	return (
		<div className='three-canvas' ref={threeCanvas}></div>
	)
}

export default App
