/**
 * @author 道章
 * @email cx385918@digital-engine.com
 * @create date 2023-12-04 17:02:13
 * @modify date 2023-12-04 17:02:13
 * @desc 各种事件处理
 */

import { 
  Camera,
  EventDispatcher,
  Intersection,
  Object3D,
  Object3DEventMap,
  Raycaster, 
  Scene, 
  Vector2
} from "three";

const mouse: Vector2 = new Vector2();
const raycaster: Raycaster = new Raycaster();

let cacheObject: Object3D | null = null;


export interface TEventManagerParameters {
  dom: HTMLCanvasElement;
  scene: Scene;
  camera: Camera;
}
export type IntersectionProps = Intersection<Object3D<Object3DEventMap>>[];
export class TEventManager extends EventDispatcher {

  domElement: HTMLCanvasElement;
  camera: Camera;
  scene: Scene;

  click: (intersection: IntersectionProps, event: MouseEvent) => unknown = () =>{};

  constructor(params: TEventManagerParameters) {
    super();

    this.domElement = params.dom;
    this.scene = params.scene;
    this.camera = params.camera;
 
		const _onMouseDown = onMouseDown.bind( this );
		const _onMouseMove = onMousemove.bind( this );
		const _onMouseUp = onMouseUp.bind( this );
		const _onClick = onClick.bind( this );
    this.domElement.addEventListener('mousedown', _onMouseDown);
    this.domElement.addEventListener('mousemove', _onMouseMove);
    this.domElement.addEventListener('mouseup', _onMouseUp);
    this.domElement.addEventListener('click', _onClick);
  }

}

// mouse / touch event handlers
function onMouseDown ( this: TEventManager ) {
  raycaster.setFromCamera(mouse, this.camera);
  // 获取与射线相交物体
  const intersection = raycaster.intersectObjects(this.scene.children, false);
  
  // 触发全局事件
  this.dispatchEvent({
    type: 'mousedown',
    intersection
  })
  // 触发对应dom的相关事件
  if(intersection?.length) {
    const object = intersection[0].object;
    
    // 触发对象的点击事件
    object.dispatchEvent({
      type: 'mousedown'
    })
  }

}

function onMousemove ( this: TEventManager,  event: MouseEvent ) {
  // mouse.x = event.
  mouse.x = event.offsetX / this.domElement.offsetWidth * 2 - 1;
  mouse.y = - event.offsetY * 2 / this.domElement.offsetHeight + 1;

  // 选取物体操作
  raycaster.setFromCamera(mouse, this.camera);
  // 判断鼠标是否与物体相交
  const intersection  = raycaster.intersectObjects(this.scene.children, false);

  // 触发全局事件
  this.dispatchEvent({
    type: 'mousemove',
    intersection
  })

  // 触发对应dom的相关事件
  if(intersection?.length) {
    const object = intersection[0].object;
    if(object !== cacheObject){
      if(cacheObject){
        cacheObject.dispatchEvent({
          type: 'mouseleave'
        })
      }
      object.dispatchEvent({
        type: 'mouseenter'
      })
      cacheObject = object;
    } else if(object === cacheObject){
      object.dispatchEvent({
        type: 'mousemove'
      })
    }
    cacheObject = object;
  } else {
    if(cacheObject){
      cacheObject.dispatchEvent({
        type: 'mouseleave'
      })
    }
    cacheObject = null;
  }
}

function onMouseUp ( this: TEventManager ) {
  raycaster.setFromCamera(mouse, this.camera);

  // 排除变换控制器的影响
  // 获取与射线相交物体
  const intersection = raycaster.intersectObjects(this.scene.children, false);
  // 还原控制器
  
  // 触发全局事件
  this.dispatchEvent({
    type: 'mouseup',
    intersection
  })

  // 触发对应dom的相关事件
  if(intersection?.length) {
    const object = intersection[0].object;
    
    // 触发对象的点击事件
    object.dispatchEvent({
      type: 'mouseup'
    })
  }
}

function onClick( this: TEventManager ) {
  raycaster.setFromCamera(mouse, this.camera);
  // 获取与射线相交物体
  const intersection = raycaster.intersectObjects(this.scene.children, false);
  
  // 触发全局事件
  // this.click(intersection, event);
  this.dispatchEvent({
    type: 'click',
    intersection
  })
  // 触发对应dom的相关事件
  if(intersection?.length) {
    const object = intersection[0].object;
    
    // 触发对象的点击事件
    object.dispatchEvent({
      type: 'click'
    })
  }

}