class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }
  static sub(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }
  static clone(vector) {
    return new Vector(vector.x, vector.y);
  }
  static fromAngle(theta, d) {
    return new Vector(d * Math.cos(theta), d * Math.sin(theta));
  }
  clone() {
    return new Vector(this.x, this.y);
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  mult(scale) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }
  div(scale) {
    this.x /= scale;
    this.y /= scale;
    return this;
  }
  //计算向量的长度
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  //求单位向量
  normalize() {
    let m = this.mag();
    if (m !== 0) {
      this.div(m);
    }
    return this;
  }
}