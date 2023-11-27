// 主程序
import { 
  MOUSE,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export class TEngine {
  private dom: HTMLElement;
  private vector2: Vector2;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private transformControls: TransformControls;

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
      'LEFT': null,
      'MIDDLE': MOUSE.DOLLY,
      'RIGHT': MOUSE.ROTATE,
    }

    // 初始变换控制器
    const transformControls = new TransformControls(camera, renderer.domElement);
    // transformControls.attach(target);
    scene.add(transformControls);
    // const target = new Object3D();
    // scene.add(target);

    // 初始射线发射器
    const raycaster = new Raycaster();

    // 绑定鼠标事件
    const mousePos = new Vector2();
    let x: number = 0;
    let y: number = 0;
    let width: number = 0;
    let height: number = 0;
    renderer.domElement.addEventListener('mousemove', (e) => {
      x = e.offsetX;
      y = e.offsetY;

      width = renderer.domElement.offsetWidth;
      height = renderer.domElement.offsetHeight;

      mousePos.x = x / width * 2 - 1;
      mousePos.y = - y * 2 / height + 1;
    })
    renderer.domElement.addEventListener('click', () => {
      raycaster.setFromCamera(mousePos, camera);

      // 获取与射线相交物体
      const intersection = raycaster.intersectObjects(scene.children);

      if(intersection?.length) {
        const object = intersection[0].object;
        console.log(object);
        transformControls.attach(object);
        
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

  }
  
  // Object3D 为 threejs 的基础类
  addObject(...object: Object3D[]) {
    object.forEach(ele => this.scene.add(ele))
  }
}