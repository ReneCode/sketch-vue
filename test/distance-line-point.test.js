
let should = require('chai').should();

import Point from '../src/models/point'
import Line from '../src/models/line'
import distanceLinePoint from '../src/models/distance-line-point';

describe.only('distance line point', () => {
  it('should check distance-line-point', () => {
    const line = new Line(
      new Point(1, 3, -3),
      new Point(-1, 1, -1)
    );
    const pt = new Point(7, 9, -6);
    let result = distanceLinePoint(line, pt);

    result.lamda.should.be.equal(-2.5);
    result.f.should.be.deep.equal({ x: 6, y: 8, z: -8 })
    result.distance.should.be.deep.closeTo(Math.sqrt(6), 0.0001)
  })

  it('should calc distance ', () => {
    const p1 = { x: 1, y: 3, z: -3 }
    const p2 = { x: -1, y: 1, z: -1 }
    // point
    const c = { x: 7, y: 9, z: -6 }
    const delta = {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
      z: p2.z - p1.z
    };
    delta.should.be.deep.equal({ x: -2, y: -2, z: 2 });
    // delta.x * c.x + delta.y + c.y + delta.z * c.z + k = 0
    const k = -(delta.x * c.x + delta.y * c.y + delta.z * c.z)
    k.should.be.equal(44);

    /*
      delta.x * (p1.x + lamda * delta.x) + 
      delta.y * (p1.y + lamda * delta.y) + 
      delta.y * (p1.z + lamda * delta.z + k = 0
 
      delta.x * p1.x + lamda * delta.x^2 +
      delta.y * p1.y + lamda * delta.y^2 +
      delta.z * p1.z + lamda * delta.z^2 + k = 0
 
      lamda = -(delta.x * p1.x + delta.y * p1.y + delta.z * p1.z + k) / (delta.x^2 + delta.y^2 + delta.z^2)
    */

    const lamda = -(delta.x * p1.x + delta.y * p1.y + delta.z * p1.z + k) / (delta.x * delta.x + delta.y * delta.y + delta.z * delta.z);
    lamda.should.be.equal(-2.5);

    /*
        f = p1 + lamda * delta
    */
    const f = {
      x: p1.x + lamda * delta.x,
      y: p1.y + lamda * delta.y,
      z: p1.z + lamda * delta.z
    };
    f.should.be.deep.equal({ x: 6, y: 8, z: -8 })

    const distance = Math.sqrt()
  });
});
