var x1, x2,
y1, y2, canvas, context, brush = {
	x: 0,
	y: 0,
	color: "#0088ff",
	size: 10,
	type: null,
	full: false,
	down: false
}, strokes = [], currentStroke = null, points = [];


function init(){
	canvas = $('#canvas');
	canvas.attr({
		width: window.innerWidth,
		height: window.innerHeight
	});

	context = canvas[0].getContext('2d');
	context.lineCap = 'round';



	$("#size").on('input', function () {
		brush.size = this.value;
	});

	$("#color").on('input', function () {
		brush.color = this.value;
	});

	$("#clear").click(function () {
		strokes = [];

	});

	$(".type").click(function(){
		$(".buttons").children().removeClass("actif");
		$("#"+this.id).addClass("actif");

		brush.type = this.id;

		window["draw" + brush.type]();
	});

	$("#full").click(function () {
		if(!brush.full){
			brush.full = true;
			$('#full').addClass("actif");
		}
		else{
			brush.full = false;
			$('#full').removeClass("actif");
		}
	});
}

function drawcrayon(){
	'use strict';
	var i, j, s, p;
	$("#canvas").click(function(e){
		if($("#crayon").hasClass("actif")){
			function draw(){
				for (i = 0; i < strokes.length; i += 1) {
					s = strokes[i];
					context.strokeStyle = s.color;
					context.lineWidth = s.size;
					context.beginPath();
					context.moveTo(s.points[0].x, s.points[0].y);

					for (j = 0; j < s.points.length; j += 1) {
						p = s.points[j];
						context.lineTo(p.x, p.y);
					}
					context.stroke();
				}
			}

			canvas.mousedown(function (e) {
				brush.down = true;

				currentStroke = {
					color: brush.color,
					size: brush.size,
					points: []
				};
				strokes.push(currentStroke);

				brush.x = e.pageX;
				brush.y = e.pageY;

				currentStroke.points.push({
					x: brush.x,
					y: brush.y
				});
				draw();

			}).mouseup(function (e) {
				brush.down = false;

				brush.x = e.pageX;
				brush.y = e.pageY;
				if($("#crayon").hasClass("actif")){
					currentStroke.points.push({
						x: brush.x,
						y: brush.y
					});
					draw();
				}


				currentStroke = null;

			}).mousemove(function (e) {
				if (brush.down) {
					brush.x = e.pageX;
					brush.y = e.pageY;

					currentStroke.points.push({
						x: brush.x,
						y: brush.y
					});
					draw();

				}
			});

		}

	});

}

function drawline(){
	var x1, x2,
	y1, y2, points = [];
	$(canvas).click(function(e){
		if($("#line").hasClass("actif")){
			points.push([e.pageX, e.pageY]);
			if(points.length === 2){
				x1 = points[0][0];
				x2 = points[1][0];
				y1 = points[0][1];
				y2 = points[1][1];
				context.lineWidth = brush.size;
				context.strokeStyle = brush.color;
				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.stroke();

				points = [];
			}
		}
	});
}

function drawrectangle(){
	var width,
	height, x1, x2, y1, y2, points = [];
	$(canvas).click(function(e){
		if($("#rectangle").hasClass("actif")){
			points.push([e.pageX, e.pageY]);
			if(points.length === 2){
				x1 = points[0][0];
				y1 = points[0][1];
				x2 = points[1][0];
				y2 = points[1][1];

				context.lineWidth = brush.size;
				context.strokeStyle = brush.color;
				context.fillStyle = brush.color;
				if(y1>y2)
					height = -(y1 - y2);
				else
					height = y2 - y1;

				if(x1>x2){
					width = -(x1 - x2); 
				}
				else
					width = x2 - x1;

				if(!brush.full)
					context.strokeRect(x1, y1, width, height);
				else
					context.fillRect(x1, y1, width, height);

				points = [];
			}
			
		}
	});
}

function drawcercle(){
	var radius, x1, x2, y1, y2, points = [];

	$(canvas).click(function(e){
		if($("#cercle").hasClass("actif")){
			points.push([e.pageX, e.pageY]);
			if(points.length === 2){

				xA = points[0][0];
				yA = points[0][1];
				xB = points[1][0];
				yB = points[1][1];

				radius = Math.pow((yA - yB), 2) + Math.pow((xB - xA), 2);
				radius = Math.sqrt(radius);

				context.lineWidth = brush.size;
				context.strokeStyle = brush.color;
				context.fillStyle = brush.color;

				context.beginPath();
				context.arc(xA, yA, radius, 0, 2*Math.PI);
				if(!brush.full)
					context.stroke();
				else
					context.fill();

				points = [];
			}
		}
	});

}

init();