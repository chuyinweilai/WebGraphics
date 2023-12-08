// 贴图文件

import { Texture, TextureLoader, SRGBColorSpace, CanvasTexture } from "three";
import { R } from "../img";
import { TCanvasEditor } from "./TCanvasEditor";


// 实例化贴图加载器
const textureLoader: TextureLoader = new TextureLoader();
export const pictureTexture: Texture = textureLoader.load(R);
// export const pictureTexture: Texture = textureLoader.load( 'https://threejs.org/manual/examples/resources/images/wall.jpg' );
pictureTexture.colorSpace = SRGBColorSpace;


export const tipsTexture = new CanvasTexture(
  new TCanvasEditor(1920, 1080)
  .draw((ctx) => {
    ctx.fillStyle = 'rgba(200, 200, 100)';
    ctx.beginPath();
    ctx.fillRect(0, 0, 1920, 1080);
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '72px 微软雅黑';
    ctx.translate(960, 400);

    ctx.beginPath();
    ctx.fillText("作者：Kieed", 0, 0);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillText("ID：62446886", 0, 100);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillText("时间：2023-12-07", 0, 200);
    ctx.closePath();
  })
  .canvas
) 