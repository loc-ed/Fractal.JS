
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
            // this.iteration = 0
            // this.max_iterations = 100
            // this.context = context;
            // this.x = 0;
            // this.y = 0;
        }

        drawMandelbrot(context) {
            var imageData = context.createImageData(this.canvasWidth, this.canvasHeight);
            var iData = imageData.data;

            max_iterations = 100;
            for (var i = 0; i < this.canvasHeight; i++) {
                for (var j = 0; j < this.canvasWidth; j++) {

                    //limit the axis 
                    x0 = -2.0 + j * 3.0 /this.canvasWidth         //(-2,1)
                    y0 = -1.0 + i * 2.0 / this.canvasHeight       //(-1,1)

                    x = 0;
                    y = 0;
                    iteration = 0

                    while ((x * x + y * y < 4) && (iteration < max_iterations)) {
                        x_n = x * x - y * y + x0;
                        y_n = 2 * x * y + y0;
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

            x0 = -0.4;
            y0 = -0.6;

            max_iterations = 100;
            for (var i = 0; i < this.canvasHeight; i++) {
                for (var j = 0; j < this.canvasWidth; j++) {
            
                    // limit the axis
                    x = -1.5 + j * 3.0 / this.canvasWidth;
                    y = -1.0 + i * 2.0 / this.canvasHeight;
                    
                    iteration = 0;
                    
                    while ((x * x + y * y < 4) && (iteration < max_iterations)) {
                        x_n = x * x - y * y + x0;
                        y_n = 2 * x * y + y0;
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
        render(context ,pattern) {
            context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            
            if (pattern == "mandelbrot") {
                drawMandelbrot()
            }      
            if (pattern == "julia") {
                drawJulia()
            }
        }

        // //cycle between patterns 
        // update() {
    
        // }

        setPattern() {

        }
    }

    const fractal = new Fractal(canvas.width, canvas.height);

    function animate() {

        fractal.render(ctx, "mandelbrot")
        // fractal.update()
        // requestAnimationFrame(animate)
    }

    animate()

    const mandelbrot = document.getElementById('pattern');
    pattern.addEventListener('click', function() {
        

    })

});





// generated responsively to screen size 
// var canvas  = document.querySelector('canvas');
// var context = canvas.getContext('2d');

// context.fillRect(100,100,400,400)

//render function - select which pattern you'd like to generate

//mandelbrot pattern

//julia pattern

