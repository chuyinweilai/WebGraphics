export class TCanvasTextureEditor {
  private canvas: HTMLCanvasElement;

  constructor(width: number = 512, height: number = 512, bgColor: string = '#FFFFFF'){
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.backgroundColor = bgColor;
  }

  draw(fun: (ctx: CanvasRenderingContext2D) => void): this {
    const ctx = this.canvas.getContext('2d');
    if(ctx) fun(ctx);
    else console.warn('your browser can not support canvas 2d');
    // 方便链式调用 a.b().c().d()
    return this;
  }

  preview() {
    const canvas = this.canvas;
    canvas.style.position = 'fixed';
    canvas.style.top = '25%';
    canvas.style.left = '25%';
    document.body.appendChild(canvas);
    // 方便链式调用 a.b().c().d()
    return this;
  }
}