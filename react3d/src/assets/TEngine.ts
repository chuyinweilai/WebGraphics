import { 
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  GridHelper,
  MOUSE,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer
} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      45,
      this.dom.offsetWidth/this.dom.offsetHeight,
      0.1,
      1000
    )
    this.camera.position.set(40, 40, 40);
    this.camera.lookAt(new Vector3(0, 0, 0));
    // 正朝向，这里设定为y轴
    this.camera.up = new Vector3(0, 1, 0)

		this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight, true);
    // 设置清空画布后的颜色
    this.renderer.setClearColor(0x444444);
    // 清空画布
    this.renderer.clearColor();
    

    const box: Mesh = new Mesh(
      new BoxGeometry(10, 10, 10),
      new MeshStandardMaterial({
        color: 0xFF0000
      })
    )
    box.position.set(0, 0, 0);


    // 环境光
    const ambientLight: AmbientLight = new AmbientLight(0xFFFFFF, 1);

    const axesHelper: AxesHelper = new AxesHelper(500);
    const gridHelper: GridHelper = new GridHelper(500, 10, 0x39c5bb, 0x999999) 
    
    this.scene.add(box);
    this.scene.add(ambientLight);
    this.scene.add(axesHelper);
    this.scene.add(gridHelper);

    // 初始化性能监视器
    const stats = new Stats(); 
    const statsDom = stats.dom;
    statsDom.style.right = '0';
    statsDom.style.left = 'unset';

    // 初始轨道控制器
    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    orbitControls.autoRotate = true;
    orbitControls.mouseButtons = {
      'LEFT': null,
      'MIDDLE': MOUSE.DOLLY,
      'RIGHT': MOUSE.ROTATE,
    }

    // 渲染函数
    const animate = () => {
      stats.update();
      orbitControls.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animate);
    }
    animate();

    this.dom.appendChild(this.renderer.domElement);
    this.dom.appendChild(statsDom);

  }
}