class Herald extends Rect {
  constructor(props) {
    super(props);
    this.applyForce = (force) => {
      this.velocity.add(force.clone().div(this.mass));//this.mass应该为一个倍数值。
    };
    //hexxo跳动行为
    this.jump = () => {
      if (this.curConJump < this.maxConJump) {
        //velocity为给一个速度
        this.velocity = new Vector();//将this.velocity重置为（0,0），如果不做这一步，herald的速度可能已经向下了，甚至可能大于后面所给的一个向下的速度，就有可能跳第二次herald没什么反应了。
        this.applyForce === null || this.applyForce === void 0 ? void 0 : this.applyForce(new Vector(0, -12));
        this.curConJump++;
      }
      else if (this.curConJump === this.maxConJump) {
        this.velocity.add(new Vector(0, 30));
        this.curConJump++;//在碰撞时this.curConJump会为0
      }
    };
    this.mass = props.mass !== null && props.mass !== void 0 ? props.mass : 1;
    this.velocity = props.velocity !== null && props.velocity !== void 0 ? props.velocity : new Vector();
    this.maxConJump = 2;
    this.curConJump = 0;
  }
  //更新herald数据
  update(stage) {
    const { verticalAcceleration } = stage;
    this.prevPosition = this.position.clone();
    this.prevVelocity = this.velocity.clone();
    this.velocity.add(verticalAcceleration);
    //sub 左参数-右参数
    this.position.add(Vector.sub(this.velocity, verticalAcceleration.clone().mult(0.5)));
  }
}