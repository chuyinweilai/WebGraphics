import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { pictureTexture } from './TTextures';
import { getCerberus, getFemale } from "./TLoaderModel";




export const groupPromise = new Promise<Group>((resolve, reject) => {
  const group = new Group();

  // 图片
  const picture = new Mesh(
    new PlaneGeometry(192, 108),
    new MeshBasicMaterial({
      map: pictureTexture,
    })
  )
  picture.castShadow = true;
  picture.position.set(0, 120, -40);
  picture.scale.set(0.3, 0.3, 0.3);
  
  group.add(picture);

  // 模拟相框模型
  getCerberus().then((frame) => {
    if(frame) group.add(frame);
    resolve(group);
  }).catch(err => {
    reject(err)
  })
});