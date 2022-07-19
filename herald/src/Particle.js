class Particle extends Rect {
  constructor(props) {
    super(props);
    this.applyForce = (force) => {
      this.velocity.add(force.clone().div(this.mass));
    };
    this.update = (stage) => {
      if (!this.isFirstTime) {
        this.opacity -= 0.05;//让粒子慢慢消失
        const { verticalAcceleration, horizontalVelocity } = stage;
        this.velocity.add(verticalAcceleration);
        this.position.add(Vector.add(this.velocity, horizontalVelocity));
        this.opacity = Math.max(this.opacity, 0);
      }
      this.isFirstTime = false;
    };
    this.velocity = props.velocity;
    this.isFirstTime = true;
    this.mass = props.mass;
  }
}