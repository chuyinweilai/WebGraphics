// 贴图文件

import { Texture, TextureLoader, SRGBColorSpace } from "three";
import { R } from "../img";


// 实例化贴图加载器
const textureLoader: TextureLoader = new TextureLoader();
export const pictureTexture: Texture = textureLoader.load(R);
// export const pictureTexture: Texture = textureLoader.load( 'https://threejs.org/manual/examples/resources/images/wall.jpg' );
pictureTexture.colorSpace = SRGBColorSpace;
