/* 
精灵
传统意义：Sprite是性能不足下的一种硬件图形加速手段，用于显示自由活动的二维图形块。
将需要重绘的部分单独设置为一个图层，减少重绘压力

现代意义：Sprite是一种软件层面的抽象概念，用于表示并处理自由活动的对象。仅使用CPU进行2D图像渲染已非常常见。但为了减少不必要的重绘（比如两帧中不变的部分），开发者仍然可以采取类似的处理方式，将自行定义的Sprite绘制在特定的缓冲层，在显示的时候再将各层叠加得到最终画面。而这些Sprite，更多是为了简化开发流程而人为规定的模型和概念，与硬件不再是强相关了。
 */

import { BoxGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Sprite, SpriteMaterial } from "three";
import { pictureTexture, pictureTextureList, tipsTexture, tipsTextureList } from './TTextures';
import pictureConfig from './../json/pictures.json';

export const groupPromise = new Promise<Group>((resolve) => {
  const group = new Group();

  // 图片
  const picture = new Mesh(
    new PlaneGeometry(192, 108),
    new MeshBasicMaterial({
      map: pictureTexture,
    })
  )
  picture.castShadow = true;
  picture.position.set(0, 0, 10);
  picture.scale.set(0.3, 0.3, 0.3);
  
  // 标签
  const tips = new Mesh(
    new PlaneGeometry(19, 10),
    new MeshStandardMaterial({
      map: tipsTexture,
    })
  )
  tips.position.set(0, -45, 0);

  // sprite: 不于画布融为一体，像一个幽灵悬浮于画面之外。
  // const tips: Sprite = new Sprite(new SpriteMaterial({
  //   map: tipsTexture,
  //   sizeAttenuation: false, // 无尺寸衰减
  //   depthTest: false, // 不进行深度确认
  //   depthWrite: false,  // 不影响深度缓冲区域
  // }));
  // tips.position.set(0, 60, 0);
  // tips.scale.set(0.16,0.09,1);

  // 相框 
  const plan = new Mesh(
    new BoxGeometry(210, 120, 30),
    new MeshBasicMaterial({
      color: 0x39c5bb
    })
  )
  plan.castShadow = true;
  plan.scale.set(0.3, 0.3, 0.3);

  group.position.set(0, 160, -80);
  group.add(tips);
  group.add(plan);
  group.add(picture);

  resolve(group)
});

export const groupListPromise = new Promise<Group[]>((resolve) => {

  // 相框间隔
  const spacing = 200;
  const distance = (pictureTextureList.length - 1) * spacing / 2;
  const pictureGeometry = new PlaneGeometry(192, 108);
  const tipsGeometry = new PlaneGeometry(19, 10);
  const planGeometry = new BoxGeometry(210, 120, 30);
  // 图片
  const groupList: Group[] = pictureConfig.map((_, index: number) => {
    const pictureTexture = pictureTextureList[index];
    const tipsTexture = tipsTextureList[index];
    const group = new Group();
    const picture = new Mesh(
      pictureGeometry,
      new MeshBasicMaterial({
        map: pictureTexture,
      })
    )
    picture.castShadow = true;
    picture.position.set(0, 0, 10);
    picture.scale.set(0.3, 0.3, 0.3);
    group.add(picture);

    // 标签
    const tips = new Mesh(
      tipsGeometry,
      new MeshStandardMaterial({
        map: tipsTexture,
      })
    )
    tips.position.set(0, -45, 0);
    group.add(tips);

    // 相框 
    const plan = new Mesh(
      planGeometry,
      new MeshBasicMaterial({
        color: 0x39c5bb
      })
    )
    plan.castShadow = true;
    plan.scale.set(0.3, 0.3, 0.3);

  
    group.position.x = index * spacing - distance;
    group.position.y = 160;
    group.position.z = -80;
    group.add(plan);
    
    return group;
  })
  
  resolve(groupList);
});