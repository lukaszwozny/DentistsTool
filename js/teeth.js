function Tooth(id, posX, posY, size){

    this.id = id;
    this.size = size;
    this.x = posX;
    this.y = posY;
    
    this.id_u = this.id+"_u";
    this.img_u = "u";
    
    
    this.id_r = this.id+"_r";
    this.img_r = "r";
    this.dx_r = 66;
    this.dy_r = 0;
    
    
    this.id_d = this.id+"_d";
    this.img_d = "d";
    this.dx_d = 1;
    this.dy_d = 60;
    
    
    this.id_l = this.id+"_l";
    this.img_l = "l";
    this.dx_l = 0;
    this.dy_l = 0;
    
    
    this.id_c = this.id+"_c";
    this.img_c = "c";
    this.dx_c = 30;
    this.dy_c = 27;
}

Tooth.prototype.draw = function(){
    var content = document.getElementById("content");
    // UP
    this.img_u = '<img id="'+this.id_u+'" class="tooth_part" src="img/u'+this.size+'.png">';
    content.innerHTML += this.img_u;
    
    // move img to correct position
    document.getElementById(this.id_u).style.left = this.x+"px";
    document.getElementById(this.id_u).style.top = this.y+"px";
    
    // RIGHT
    this.img_r = '<img id="'+this.id_r+'" class="tooth_part" src="img/r'+this.size+'.png">';
    content.innerHTML += this.img_r;
    
    // move img to correct position
    document.getElementById(this.id_r).style.left = this.x+this.dx_r+"px";
    document.getElementById(this.id_r).style.top = this.y+this.dy_r+"px";
    
    // DOWN
    this.img_d = '<img id="'+this.id_d+'" class="tooth_part" src="img/d'+this.size+'.png">';
    content.innerHTML += this.img_d;
    
    // move img to correct position
    document.getElementById(this.id_d).style.left = this.x+this.dx_d+"px";
    document.getElementById(this.id_d).style.top = this.y+this.dy_d+"px";
    
    // LEFT
    this.img_l = '<img id="'+this.id_l+'" class="tooth_part" src="img/l'+this.size+'.png">';
    content.innerHTML += this.img_l;
    
    // move img to correct position
    document.getElementById(this.id_l).style.left = this.x+this.dx_l+"px";
    document.getElementById(this.id_l).style.top = this.y+this.dy_l+"px";
    
    // CENTER
    this.img_c = '<img id="'+this.id_c+'" class="tooth_part" src="img/c'+this.size+'.png">';
    content.innerHTML += this.img_c;
    
    // move img to correct position
    document.getElementById(this.id_c).style.left = this.x+this.dx_c+"px";
    document.getElementById(this.id_c).style.top = this.y+this.dy_c+"px";
};


var teeth = new Array();

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
    
function loadCoords(filename)
{
    $.get('img/'+filename+'.txt', function(data) {
        var lines = data.split('\n');
        for(i=0; i<lines.length; i++){
            var coords = lines[i].split(" ");
            var tooth_id = Number(coords[0]);
            var size = Number(coords[1]);
            var dx = Number(coords[2]);
            var dy = Number(coords[3]);
            
            var tooth = new Tooth(tooth_id, dx, dy, size);
            teeth[tooth_id] = tooth;
            
            tooth.draw();
        }
        initTeethAction();
    }, 'text');
}

function initTeethAction()
{
    $('.tooth_part').on("mousedown", function(event) {
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
            var id = $(this).get(0).id;
            var splited = id.split('_');
            id = splited[0];
            var side = splited[1];
            
            var tooth = teeth[id];
            
            console.log(tooth.id + " " + side);
        }
    });
    
    
//    $('.t_r').on("mousedown", function(event) {
//        // Get click coordinates
//        var x = event.pageX - this.offsetLeft,
//            y = event.pageY - this.offsetTop,
//            w = ctx.canvas.width = this.width,
//            h = ctx.canvas.height = this.height,
//            alpha;
//
//        // Draw image to canvas
//        // and read Alpha channel value
//        ctx.drawImage(this, 0, 0, w, h);
//        alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A
//
//        // If pixel is transparent,
//        // retrieve the element underneath and trigger it's click event
//        if( alpha===0 ) {
//            $(this).hide();
//            $(document.elementFromPoint(event.clientX, event.clientY)).trigger("click");
//            $(this).show();
//        } else {
//            id = $(this).get(0).id;
//            var t = teeth[id];
//            console.log(id+" "+t.size);
//        }
//    });
}

function testownia()
{
    
    loadCoords("coords");
    
//    $("#teeth-map").on("click", function(){
//        console.log("Green image clicked!");
//    });
}

window.onload = testownia
