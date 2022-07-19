class Platform extends Rect {
  update(stage) {
    const { horizontalVelocity } = stage;
    this.prevPosition = this.position.clone();
    this.position.add(horizontalVelocity);
  }
}