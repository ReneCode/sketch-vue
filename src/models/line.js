
export default class Line {
  constructor(p1, p2) {
    this.p1 = p1.clone();
    this.p2 = p2.clone();
  }

  length() {
    const delta = this.p2.sub(this.p1);
    return delta.length();
  }

  angle() {
    const delta = this.p2.sub(this.p1);
    return delta.angle();
  }

}
