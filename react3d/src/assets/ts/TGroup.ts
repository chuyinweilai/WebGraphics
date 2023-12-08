import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { pictureTexture, tipsTexture } from './TTextures';

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
    new MeshBasicMaterial({
      map: tipsTexture,
    })
  )
  tips.position.set(0, 60, 0);
  tips.onBeforeRender = (renderer, screen, camera) => {
    tips.lookAt(camera.position);
  }

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