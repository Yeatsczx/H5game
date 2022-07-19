class Rect {
  constructor(props) {
    //画矩形
    this.draw = ({ ctx }) => {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.restore();
    };
    this.position = props.position;
    this.width = props.width;
    this.height = props.height;
    this.color = props.color;
    this.opacity = props.opacity ?? 1;
  }
  // 判断两个矩形是否相交，r1为herald，列举四种不相交的情况，然后取反
  static isIntersect(r1, r2) {
    return !(r2.position.x > r1.position.x + r1.width ||
      r2.position.x + r2.width < r1.position.x ||
      r2.position.y > r1.position.y + r1.height ||
      r2.position.y + r2.height < r1.position.y);
  }
}