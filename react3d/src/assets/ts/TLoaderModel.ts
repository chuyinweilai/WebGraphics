import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { getAssetUrl } from "../../Basic/utils";

const fileUrl = import.meta.url;
const objLoader = new OBJLoader();
const mtllLoader = new MTLLoader();

// 1、导入材质
const mtll = getAssetUrl('./../obj/female02/female02.mtl', fileUrl)
const materials = await mtllLoader.loadAsync(mtll);

// 导入模型
const objModel = getAssetUrl('./../obj/female02/female02.obj', fileUrl);
// 加载带有材质的模型
export const femalePromise = objLoader
  .setMaterials(materials)
  .loadAsync(objModel);
// 导入材质

