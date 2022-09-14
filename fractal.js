
//JS only runs when the page including image has been fully loaded 
window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Fractal {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.max_iterations = 100;
            this.pattern = "mandelbrot";
        }

        drawMandelbrot(context) {
            var imageData = context.createImageData(this.canvasWidth, this.canvasHeight);
            var iData = imageData.data;

            for (var i = 0; i < this.canvasHeight; i++) {
                for (var j = 0; j < this.canvasWidth; j++) {

                    //limit the axis 
                    var x0 = -2.0 + j * 3.0 /this.canvasWidth         //(-2,1)
                    var y0 = -1.0 + i * 2.0 / this.canvasHeight       //(-1,1)

                    var x = 0;
                    var y = 0;
                    var iteration = 0

                    while ((x * x + y * y < 4) && (iteration < this.max_iterations)) {
                        var x_n = x * x - y * y + x0;
                        var y_n = 2 * x * y + y0;
                        x = x_n;
                        y = y_n;
                        iteration++;
                    }

                    //set pixel data
                    iData[i * this.canvasWidth * 4 + j * 4 + 0] = iteration*15;
                    iData[i * this.canvasWidth * 4 + j * 4 + 1] = iteration*3;
                    iData[i * this.canvasWidth * 4 + j * 4 + 2] = iteration*5;
                    iData[i * this.canvasWidth * 4 + j * 4 + 3] = 255;
                }
            }

            context.putImageData(imageData, 0, 0)
        }


        drawJulia(context) {
            var imageData = context.createImageData(this.canvasWidth, this.canvasHeight);
            var iData = imageData.data;

            var x0 = -0.4;
            var y0 = -0.6;

            for (var i = 0; i < this.canvasHeight; i++) {
                for (var j = 0; j < this.canvasWidth; j++) {
            
                    // limit the axis
                    var x = -1.5 + j * 3.0 / this.canvasWidth;
                    var y = -1.0 + i * 2.0 / this.canvasHeight;
                    
                    var iteration = 0; 
                    
                    while ((x * x + y * y < 4) && (iteration < this.max_iterations)) {
                        var x_n = x * x - y * y + x0;
                        var y_n = 2 * x * y + y0;
                        x = x_n;
                        y = y_n;
                        iteration++;
                    }
                    // set pixel color [r,g,b,a]
                    iData[i * this.canvasWidth * 4 + j * 4 + 0] = iteration*25;
                    iData[i * this.canvasWidth * 4 + j * 4 + 1] = iteration*5;
                    iData[i * this.canvasWidth * 4 + j * 4 + 2] = iteration*8;
                    iData[i * this.canvasWidth * 4 + j * 4 + 3] = 255;
                }		
	        }
            context.putImageData(imageData, 0, 0);
        }
    
        //draw currenty active pattern on canvas
        render(context) {
            context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            
            if (this.pattern == "mandelbrot") {
                this.drawMandelbrot(context)
            }      
            if (this.pattern == "julia") {
                this.drawJulia(context)
            }
        }

        setPattern(pattern) {
            this.pattern = pattern
        }
    }

    const fractal = new Fractal(canvas.width, canvas.height);
    function animate() {

        fractal.render(ctx)
        requestAnimationFrame(animate)
    }

    animate()
  
    const mandelbrot = document.getElementById('mandelbrot');
    mandelbrot.addEventListener('click', function() {
        fractal.setPattern("mandelbrot")

    });
    const julia = document.getElementById('julia');
    julia.addEventListener('click', function() {
        fractal.setPattern("julia")

    });

});

