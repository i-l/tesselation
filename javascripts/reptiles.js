
		
function getPointByAngle(r, x, y, angle) {
	return { "x": (x + r * Math.sin(Math.PI * angle / 180)),  "y": (y + r * Math.cos(Math.PI * angle / 180))}; 
}
			
function getNextPoint(point, angle, dist) {
	return { "x": point.x + dist * (Math.sin(angle)), "y": (point.y + dist * Math.cos(angle)) };
}

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

function addReptilePoints(points, refPoint, refAngle, angles, distances, r, reversed) {
	for (var i = 0; i < angles.length; i++) {
		var num = reversed ? angles.length - 1 - i : i;
		var angle = (refAngle + angles[num]) * Math.PI / 180;
		points.push(getNextPoint(refPoint, angle, distances[num] * r));
	}
}			
			
function getReptilePoints(r, x, y, startAngle) {
	var points = [];
	var angle = 90 + startAngle;
	var refAngle = -90 + startAngle;
	var angles = [[0, 50, 28, 32, 60, 68, 120, 154, 150, 120],[0, 24, 51, 60, 114, 96, 78, 60],[0, -58, -41, -32, 12.5,  23, 19, 24, 18, 0]];				
	var distances = [[0, 0.24, 0.28, 0.43, 0.52, 0.514, 0.25, 0.625, 0.764, 1],
					[0, 0.35, 0.47, 0.7, 0.77, 1.09, 0.93, 1],
					[0, 0.52, 0.82, 0.45, 0.36, 0.47, 0.875, 0.99, 1.17, 1]];
	var reference = getPointByAngle(r, x, y, angle);			
		
	for (var i = 0; i < 3; i++) {
		angle += 120;
		refAngle -= 180;
		addReptilePoints(points, reference, refAngle, angles[i], distances[i], r, false);
		reference = getPointByAngle(r, x, y, angle);
		addReptilePoints(points, reference, refAngle - 120, angles[i], distances[i], r, true);
	}
		
	return points;
}
	