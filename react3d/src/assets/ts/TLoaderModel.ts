import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { getAssetUrl } from "../../Basic/utils";
import { MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";

const fileUrl = import.meta.url;
const objLoader = new OBJLoader();
const mtllLoader = new MTLLoader();
const textureLoader = new TextureLoader();

/* 
  导入材质有两种方案：
  1、导入组装好的材质文件 mtl
  2、手动组装材质
 */
// 1、导入组装好的材质文件
const mtll = getAssetUrl('./../obj/female02/female02.mtl', fileUrl)
const femaleMaterials = await mtllLoader.loadAsync(mtll);
// 导入模型
const femaleModel = getAssetUrl('./../obj/female02/female02.obj', fileUrl);
// 加载带有材质的模型
export const femalePromise = objLoader
  .setMaterials(femaleMaterials)
  .loadAsync(femaleModel);
// 导入材质

// 2、手动组装材质贴图
// 颜色贴图
const C_Url = getAssetUrl('./../obj/cerberus/Cerberus_A.jpg', fileUrl)
const colorTexture = textureLoader.load(C_Url);
// 法线贴图的纹理
const R_Url = getAssetUrl('./../obj/cerberus/Cerberus_N.jpg', fileUrl)
const normalTexture = textureLoader.load(R_Url);
// 位移纹理贴图
const D_Url = getAssetUrl('./../obj/cerberus/Cerberus_RM.jpg', fileUrl)
const metalnessTexture = textureLoader.load(D_Url);
// 凹凸纹理贴图
const B_Url = getAssetUrl('./../obj/cerberus/Cerberus_M.jpg', fileUrl)
const bumpTexture = textureLoader.load(B_Url);
// 合并材质
export const cerberusMaterial = new MeshStandardMaterial({
  map: colorTexture,
  metalness: 1,
  metalnessMap: metalnessTexture,
  normalMap: normalTexture,
  bumpMap:bumpTexture
})
// 导入模型
const cerberusModel = getAssetUrl('./../obj/cerberus/Cerberus.obj', fileUrl);
export const cerberusPromise = objLoader.loadAsync(cerberusModel);