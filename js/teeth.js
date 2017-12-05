function changeColor()
{
    alert("Click!");
}

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
    
function loadCoords(filename)
{
    $.get('img/'+filename+'.txt', function(data) {
        var lines = data.split('\n');
        for(i=0; i<lines.length; i++){
            var coords = lines[i].split(" ");
            var tooth_id = coords[0]
            var image_id = coords[1]
            var dx = Number(coords[2]);
            var dy = Number(coords[3]);
            drawTooth(tooth_id, image_id, dx, dy);
        }
    }, 'text');
}

function drawTooth(tooth_id, image_id, x, y)
{
    var img_file = 
        '<img id="t'+tooth_id+'" class="tooth" src="img/'+image_id+'.png">';
    var content = document.getElementById("content");
    content.innerHTML += img_file;
    
    // move img to correct position
    document.getElementById('t'+tooth_id).style.left = x+"px";
    document.getElementById('t'+tooth_id).style.top = y+"px";
    
    initToothAction(tooth_id);
}


function initToothAction(tooth_id)
{
    $('.tooth').on("mousedown", function(event) {
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
            console.log($(this).get(0).id);
        }
    });
}

function testownia()
{
    
    loadCoords("18u");
    
//    $("#teeth-map").on("click", function(){
//        console.log("Green image clicked!");
//    });
}

window.onload = testownia
