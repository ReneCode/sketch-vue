
let should = require('chai').should();

import Matrix2d from '../src/models/matrix-2d'

describe('Matrix2d', () => {
  it('should construct Matrix()', () => {
    const m = new Matrix2d(1, 2, 3, 4, 5, 6);
    m.a.should.be.equal(1);
    m.b.should.be.equal(2);
    m.c.should.be.equal(3);
    m.d.should.be.equal(4);
    m.e.should.be.equal(5);
    m.f.should.be.equal(6);
    (m instanceof Matrix2d).should.be.true
  });

  it('should identity', () => {
    const m = Matrix2d.identity();
    const expect = new Matrix2d(1, 0, 0, 1, 0, 0);
    m.should.be.deep.equal(expect);
  })

  it('should transform point identity', () => {
    const m = Matrix2d.identity();
    const pt = m.transformPoint(4, 5)
    pt.x.should.be.equal(4);
    pt.y.should.be.equal(5);
  })

});
