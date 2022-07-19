class PlatformManager {
  constructor(props) {
    this.update = (stage) => {

      //this.lastPlatform.position.x < stage.width表示前一个平台的左侧已经出现在舞台时，就开始执行{}的内容绘制一个新的平台
      while (!this.platforms.length ||
        this.lastPlatform.position.x < stage.width) {
        const { width, height, gap } = PlatformManager.getRandomProperties(stage);
        let prev = !this.platforms.length
          ? 0
          : this.lastPlatform.position.x + this.lastPlatform.width + gap;
        const newPlatform = new Platform({
          position: new Vector(prev, stage.height - height),//stage.height - height，stage.height是舞台的高度，即整个浏览器的高度，height为一个平台的高度
          width: !this.platforms.length
            ? random(stage.width * 0.8, stage.width)//每次开始时，第一个舞台的宽度
            : width,//第二个及以后舞台的宽度
          height,
          color: randomOne(this.colors)//在自定义的几个颜色中随机舞台颜色
        });
        this.lastPlatform = newPlatform;
        this.platforms.push(newPlatform);
      }
      for (let i = 0; i < this.platforms.length; i++) {
        const platform = this.platforms[i];
        platform.update(stage);//platform的更新方法，不是PlatformManager的，为平台设置速度
        // 如果已经走过屏幕左边,需要将它的位置调整到队尾,达到复用的目的
        if (platform.position.x + platform.width < 0) {
          const { width, height, gap } = PlatformManager.getRandomProperties(stage);
          platform.position = new Vector(this.lastPlatform.position.x + this.lastPlatform.width + gap, stage.height - height);
          platform.color = randomOne(this.colors);
          platform.width = width;
          platform.height = height;
          this.lastPlatform = platform;
        }
      }
    };
    //画出平台
    this.draw = (stage) => {
      this.platforms.forEach((p) => p.draw(stage));//p的draw继承自Rect
    };
    const { colors } = props;
    this.colors = colors;
    this.platforms = [];
    this.lastPlatform = null;
  }
  //取得平台随机数据
  static getRandomProperties(stage) {
    const width = random(80, 680);
    const height = random(50, 200);
    const gap = random((80 * Math.abs(stage.horizontalVelocity.x)) / 3, (180 * Math.abs(stage.horizontalVelocity.x)) / 3);
    return {
      width,
      height,
      gap
    };
  }
}