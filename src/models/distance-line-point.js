
import Point from './point';

function distanceLinePoint(line, point) {
  /*
    line: p1, p2
    point: c
  */
  const p1 = { x: line.p1.x, y: line.p1.y, z: line.p1.z };
  const p2 = { x: line.p2.x, y: line.p2.y, z: line.p2.z };
  const c = { x: point.x, y: point.y, z: point.z };

  const delta = {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z
  };
  // delta.x * c.x + delta.y + c.y + delta.z * c.z + k = 0
  const k = -(delta.x * c.x + delta.y * c.y + delta.z * c.z)

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

  /*
      f = p1 + lamda * delta
  */
  const f = new Point(
    p1.x + lamda * delta.x,
    p1.y + lamda * delta.y,
    p1.z + lamda * delta.z
  );

  const distance = f.sub(point).length();
  return {
    lamda: lamda,
    f: f,
    distance: distance
  }
}

export default distanceLinePoint;
