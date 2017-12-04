function changeColor()
{
    alert("Click!");
}

function testownia()
{
    var canvas = document.createElement("canvas");

    var ctx = canvas.getContext("2d");
    
    
    document.getElementById("tooth").style.top = 364+"px";
    document.getElementById("tooth").style.left = 63+"px";
    $('#tooth').on("mousedown", function(event) {
        // Get click coordinates
        var x = event.pageX - this.offsetLeft,
            y = event.pageY - this.offsetTop,
            w = ctx.canvas.width = this.width,
            h = ctx.canvas.height = this.height,
            alpha;

        // Draw image to canvas
        // and read Alpha channel value
        ctx.drawImage(this, 0, 0, w, h);
        alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

          // If pixel is transparent,
          // retrieve the element underneath and trigger it's click event
        if( alpha===0 ) {
            $(this).hide();
            $(document.elementFromPoint(event.clientX, event.clientY)).trigger("click");
            $(this).show();
        } else {
            console.log("LOGO clicked!");
        }
    });
    
    $("#teeth-map").on("click", function(){
        console.log("Green image clicked!");
    });
}

window.onload = testownia
