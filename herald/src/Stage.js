class Stage {
  constructor(props) {
    var _a;
    this.entities = [];
    //处理调整
    this.handleResize = () => {
      this.init();
    };
    this.tick = (callback) => {
      //请求动画帧
      this.raf = requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.width, this.height);//擦除上一帧画布
        this.tick(callback);
      });
      const stage = {
        width: this.width,
        height: this.height,
        verticalAcceleration: this.verticalAcceleration,
        ctx: this.ctx,
        horizontalVelocity: this.horizontalVelocity
      };
      //更新herald及平台数据
      for (const entity of this.entities) {
        entity.update(stage);
      }
      callback();
      //重新绘制herald及平台
      for (const entity of this.entities) {
        entity.draw(stage);
      }
      this.horizontalVelocity.add(this.horizontalAcceleration);
    };
    this.play = (callback) => {
      this.stop();
      this.tick(callback);
    };
    //取消请求动画帧
    this.stop = () => {
      cancelAnimationFrame(this.raf);
    };
    this.add = (...entity) => {
      //entity.length为2
      for (let i = 0; i < entity.length; i++) {
        this.entities.push(entity[i]);
      }
    };
    this.reset = () => {
      this.horizontalVelocity = this.initialHorizontalVelocity.clone();
      this.entities = [];
    };
    this.ele = document.getElementById("canvas");
    this.init();
    this.ctx = this.ele.getContext("2d");
    this.verticalAcceleration = props.verticalAcceleration;//重力加速度
    this.initialHorizontalVelocity = props.initialHorizontalVelocity;//初始水平速度
    this.horizontalVelocity = props.initialHorizontalVelocity.clone();
    this.horizontalAcceleration = props.horizontalAcceleration;//水平加速度
    //视图大小调整事件监听
    window.addEventListener("resize", this.handleResize, false);
  }
  //做适配，消除图片边缘模糊现象，并将画布大小设置为整个浏览器窗口视图大小
  init() {
    const { devicePixelRatio, innerWidth, innerHeight } = window;
    this.ele.width = innerWidth * devicePixelRatio;
    this.ele.height = innerHeight * devicePixelRatio;
    this.width = innerWidth;
    this.height = innerHeight;
    this.ele.style.width = this.width + "px";
    this.ele.style.height = this.height + "px";
    this.ctx = this.ele.getContext("2d");
    //为 canvas 单位添加缩放变换
    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }
}