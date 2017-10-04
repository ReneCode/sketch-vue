
function shrinkPoints(points, maxDelta) {
  let idxStart = 0;
  while (idxStart + 4 <= points.length) {
    const seg1 = points[idxStart + 1].sub(points[idxStart + 0]);
    const seg2 = points[idxStart + 2].sub(points[idxStart + 1]);
    const seg3 = points[idxStart + 3].sub(points[idxStart + 2]);
    const cross12 = seg1.cross(seg2);
    const cross23 = seg2.cross(seg3);
    const delta = cross12 + cross23;
    if (Math.abs(delta) < maxDelta) {
      points.splice(idxStart + 1, 2);
      idxStart += 0;
    } else {
      idxStart += 2;
    }
  }
  return points;
}

export default shrinkPoints;
