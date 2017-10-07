
import distanceLinePoint from './distance-line-point';

/*
function shrinkPointsOld(points, maxDelta) {
  let idxStart = 0;
  while (idxStart + 4 <= points.length) {
    const seg1 = points[idxStart + 1].sub(points[idxStart + 0]);
    const seg2 = points[idxStart + 2].sub(points[idxStart + 1]);
    const seg3 = points[idxStart + 3].sub(points[idxStart + 2]);
    let angle12 = seg1.scalar(seg2) / (seg1.length() * seg2.length());
    if (seg1.cross(seg2) < 0) {
      angle12 *= -1;
    }
    let angle23 = seg2.scalar(seg3) / (seg2.length() * seg3.length());
    if (Math.sign(seg2.cross(seg3)) < 0) {
      angle23 *= -1;
    }
    const delta = angle12 + angle23;
    // console.log(angle12, angle23, delta);
    if (Math.abs(delta) < maxDelta) {
      points.splice(idxStart + 1, 2);
      idxStart += 0;
    } else {
      idxStart += 2;
    }
  }
  return points;
}
*/

function shrinkPoints(points) {
  let idxStart = 0;
  let idxEnd = idxStart + 2;
  let ok = false;
  while (idxEnd < points.length) {
    let line = {
      p1: points[idxStart],
      p2: points[idxEnd]
    }
    const len = points[idxEnd].sub(points[idxStart]).length();
    const maxDelta = len / 10;
    // console.log(len, maxDelta);
    ok = true;
    // check all points between start and end
    for (let idxCheck = idxStart + 1; idxCheck < idxEnd; idxCheck++) {
      const checkPoint = points[idxCheck];
      const result = distanceLinePoint(line, checkPoint)
      // console.log(line, checkPoint, result.distance)
      if (result.distance > maxDelta) {
        ok = false;
        break;
      }
    }
    if (ok) {
      idxEnd++;
    } else {
      // remove points
      const removeCount = idxEnd - 2 - idxStart;
      // console.log("remove:", removeCount)
      if (removeCount > 0) {
        points.splice(idxStart + 1, removeCount);
      }
      idxStart = idxEnd;
      idxEnd = idxStart + 2;
    }
  }
  // console.log(ok, idxStart, idxEnd);
  if (ok) {
    points.splice(idxStart + 1, idxEnd - 2 - idxStart);
  }
  return points;
}

export default shrinkPoints;
