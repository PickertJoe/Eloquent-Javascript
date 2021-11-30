class Vec {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

export default Vec;
