window.onload = init();
function init()
{
	// link to the canvas
	c = document.getElementById('grid');
	ctx = c.getContext('2d');
	
	//define vars - gamestate and button rectangle
	//is player clicking on the arrow?
	var gamestate = 0;
	var bx, by, bw, bh;
	var hit = false;
	
	//listen out for clicks on the canvas
	c.addEventListener('click', on_canvas_click, false);
	function on_canvas_click(ev)
	{
		mx = ev.clientX - c.offsetLeft;
		my = ev.clientY - c.offsetTop;
		checkCollisions (bx, by, bw, bh);
	}
	
	//define and load the images
	function loadImages()
	{
		//pix 0 
		var p0Ready = false;
		var p0Image = new Image();
		p0Image.onload = function()
		{ p0Ready = true; };
		p0Image.src = "filename";
		//pix 1 
		var p1Ready = false;
		var p1Image = new Image();
		p1Image.onload = function()
		{ p1Ready = true; };
		p1Image.src = "filename";
		//pix 2
		var p2Ready = false;
		var p2Image = new Image();
		p2Image.onload = function()
		{ p2Ready = true; };
		p2Image.src = "filename";
	}
	
	//Draw grey box over everything
	function clear()
	{
		ctx.fillStyle = '#cccccc';
		ctx.beginPath();
		ctx(0, 0, 600, 400);//using canvas width and height
		ctx.closePath();
		ctx.fill();
	}
	
	//update everything
	function updateStuff()
	{
		if(hit == true && gamestate == 0)
		{
			gamestate = 1;
			hit = false;
		}
		if(hit == true && gamestate == 1)
		{
			gamestate = 2;
			hit = false;
		}
	}
	
	//Draw all the objects to the canvas
	function drawStuff()
	{
		ctx.fillStyle = "black";
		ctx.font = "30px Helvetica";
			
			if(gamestate == 0)
			{
				ctx.drawImage(p0Image, 0, 0);
				ctx.fillText("This is the start", 50, 50);
				//set location and size of button box
				bx = 0, by = 0, bw = 600, bh = 400;
			}
			if(gamestate == 1)
			{
				ctx.drawImage(p1Image, 0, 0);
				ctx.fillText("Click the crab", 50, 50);
				//set location and size of button box
				bx = 400, by = 300, bw = 100, bh = 50;
			}
			if(gamestate == 2)
			{
				ctx.drawImage(p2Image, 0, 0);
				ctx.fillText("blah", 50, 50);
				//set location and size of button box
				bx = 400, by = 200, bw = 100, bh = 50;
			}
			
	}
	
	//check for collisions between objects
	function checkCollisions()
	{
		if (mx > bx && mx < bx+bw && my > by && my < by+bh)
		{
			hit = true;
		}
		else
		{
			hit = false;
		}
		console.log(mx, my);
	}
	
	//redraw screen
	function gameLoop()
	{
		clear();
		updateStuff();
		drawStuff();
		setTimeout(gameLoop, 1000 / 50);
	}
	
	loadImages();
	gameLoop();
}