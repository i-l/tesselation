
//// add equidistant points on a hexagon side
function addLinePoints(points, refPoint, angle, numPoints, r) {
	for (var i = 0; i < numPoints; i++) {
		points.push(getNextPoint(refPoint, angle * Math.PI / 180, i * r / (numPoints - 1)));
	}		
}

//// hexagon with center in (x, y) and radius r, turned by angle
function getHexagonPoints(r, x, y, angle) {
	var points = [];
	for (var i = 0; i < 6; i++) {
		var reference = getPointByAngle(r, x, y, angle + 90 + i * 60);
		addLinePoints(points, reference, angle - 150 + i * 60, (i == 2 || i == 3) ? 8 : 10, r);
	}	
	return points;
}
