let init;
let herald;
let particles = [];
const maxParticleLength = 40;
let particleId = 0;
//创建舞台
const stage = new Stage({
  verticalAcceleration: new Vector(0, 0.6),// 重力加速度
  initialHorizontalVelocity: new Vector(-4, 0),//初始水平速度
  horizontalAcceleration: new Vector(-0.001, 0),//初始水平加速度
});
let hasIntersect = false;
let prevHasIntersect = false;
//判断是否碰撞到地面方块左侧
function isIntersectLeft(herald, platform) {
  if (herald.prevPosition.x + herald.width >= platform.prevPosition.x) {
    return false;
  }
  if (herald.prevPosition.y + herald.height >= platform.prevPosition.y) {
    return true;
  }
  const { x, y } = platform.prevPosition;
  const prevRightBottomX = herald.width + herald.prevPosition.x;
  const prevRightBottomY = herald.height + herald.prevPosition.y;
  const tx = (x - prevRightBottomX) / -stage.horizontalVelocity.x;
  const ty = (y - prevRightBottomY) / herald.prevVelocity.y;
  return ty < tx;
}
//碰撞检测
function collideDetect(herald, platforms) {
  //当herald掉下消失在视图中时触发，即游戏结束，注意herald.position.y越往上越小,在浏览器上面的那一边时为0，如果为负则是herald超出浏览器视图
  if (herald.position.y > stage.height) {
    init();//游戏失败，初始化游戏
    return;
  }
  let tempHasIntersect = false;
  for (let i = 0; i < platforms.length; i++) {
    //如果herald在与平台相交
    if (Rect.isIntersect(herald, platforms[i])) {
      tempHasIntersect = true;
      const platform = platforms[i];
      herald.velocity = new Vector(0, 0);
      herald.curConJump = 0;
      //如果碰撞到地面方块左侧
      if (isIntersectLeft(herald, platform)) {
        init();
        return;
      }
      herald.position.y = platform.position.y - herald.height;//纵坐标设置刚好在平台上方。
      const particleSize = 8;
      //初次碰撞时的例子效果
      if (!prevHasIntersect) {
        for (let i = 0; i < 10; i++) {
          const left = Math.random() > 0.5;
          particles[particleId % maxParticleLength] = new Particle({
            velocity: left
              ? new Vector(random(-4, -2), random(-6, -1))
              : new Vector(random(10, 16), random(-6, -1)),
            mass: 1,
            position: left
              ? new Vector(herald.position.x - particleSize, herald.position.y + herald.height - particleSize)
              : new Vector(herald.position.x + herald.width, herald.position.y + herald.height - particleSize),
            width: particleSize,
            height: particleSize,
            color: randomOne([herald.color, platform.color])
          });
          particles[particleId++ % maxParticleLength].applyForce(new Vector(0, -2));//向上的初速度
        }
      }
      //初次碰撞之后的，即在平台上滑动时的粒子效果
      else {
        particles[particleId % maxParticleLength] = new Particle({
          velocity: new Vector(0, random(-6, -1)),
          mass: 1,
          position: new Vector(herald.position.x - particleSize, herald.position.y + herald.height - particleSize),
          width: particleSize,
          height: particleSize,
          color: platform.color
        });
        particles[particleId++ % maxParticleLength].applyForce(new Vector(0, -2));
      }
    }
  }
  hasIntersect = tempHasIntersect;
  if (!prevHasIntersect && hasIntersect) {
    stage.horizontalVelocity.add(new Vector(-2, 0));//herald回到舞台时，舞台回到初始速度
  }
  if (prevHasIntersect && !hasIntersect) {
    stage.horizontalVelocity.add(new Vector(2, 0));//herald跳起时舞台减速
  }
  prevHasIntersect = hasIntersect;
}
//初始游戏
init = () => {
  stage.reset();//重置舞台
  //创建小方块
  herald = new Herald({
    position: new Vector(160, 20),
    height: 24,
    width: 24,
    color: "#222f3e"
  });
  //创建平台方块管理者
  const pm = new PlatformManager({
    colors: ["#1dd1a1", "#ff6b6b", "#feca57", "#54a0ff", "#9c88ff"]
  });
  stage.play(() => {
    collideDetect(herald, pm.platforms);//处于递归环境中，会不断执行
    //改变粒子
    for (let particle of particles) {
      particle.update(stage);
      particle.draw(stage);
    }
  });
  //在舞台中加入herald和舞台管理者
  stage.add(herald, pm);
};
//监听input标签，并对游戏模式做出改变
document.body.addEventListener("change", function (event) {
  setControlType(event.target.value);
});
//herald跳跃监听
addListener(() => {
  herald.jump();
});
init();
