// 主程序
import { 
  Group,
  MOUSE,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { IntersectionProps, TEventManager } from "./TEventManager";

let cacheObject: Mesh | null = null;
export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private eventManager: TEventManager;

  constructor(dom: HTMLElement) {
    this.dom = dom;
    const renderer = new WebGLRenderer({
      // 打开抗锯齿
      antialias: true
    });
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      this.dom.offsetWidth/this.dom.offsetHeight,
      0.1,
      1000
    )
    camera.position.set(300, 300, 300);
    camera.lookAt(new Vector3(0, 0, 0));
    // 正朝向，这里设定为y轴
    camera.up = new Vector3(0, 1, 0)

		renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight, true);
    // 设置清空画布后的颜色
    renderer.setClearColor(0x444444);
    // 清空画布
    renderer.clearColor();
    // 打开阴影
    renderer.shadowMap.enabled = true;

    // 初始化性能监视器
    const stats = new Stats(); 
    const statsDom = stats.dom;
    statsDom.style.right = '0';
    statsDom.style.left = 'unset';

    // 初始轨道控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    // orbitControls.autoRotate = true;
    orbitControls.mouseButtons = {
      'LEFT': MOUSE.RIGHT,
      'MIDDLE': MOUSE.DOLLY,
      'RIGHT': MOUSE.ROTATE,
    }

    // 初始变换控制器
    let transing: boolean = false;
    const transformControls = new TransformControls(camera, renderer.domElement);
    scene.add(transformControls);
    transformControls.addEventListener("mouseDown", () => {
      transing = true;
    });

    // 事件管理器
    const eventManager = new TEventManager({
      camera,
      scene,
      dom: renderer.domElement,
    });
    // 鼠标移动
    eventManager.addEventListener('mousemove', (event) => {
      
    })
    // 点击事件
    eventManager.addEventListener('click', ({ intersection }: any) => {
      if(transing) {
        transing = false;
        return false;
      }
      if(intersection?.length) {
        const object = intersection[0].object as Object3D;
        if(object.type !== 'Mesh') {
          scene.remove(transformControls);
          return;
        }
        scene.add(transformControls);
        transformControls.attach(object.parent instanceof Group ? object.parent: object);
      } else {
        scene.remove(transformControls);
      }
    })

    // 渲染函数
    const animate = () => {
      stats.update();
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
    // 清除内容
    this.dom.innerHTML = '';
    // 插入内容
    this.dom.appendChild(renderer.domElement);
    this.dom.appendChild(statsDom);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.eventManager = eventManager;

  }
  
  // Object3D 为 threejs 的基础类
  addObject(...object: Object3D[]) {
    object.forEach(ele => {
      this.scene.add(ele)
    })
  }
}