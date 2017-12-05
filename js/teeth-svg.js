var COORDS = new Array();
var w1 = 100;
var h1 = 25;
COORDS[1] = '0,0 '+w1+',0 '+(w1-h1)+','+h1+' '+h1+','+h1;

function Tooth(id, posX, posY, size){
    this.id = id;
    this.size = size;
    this.x = posX;
    this.y = posY;
    
    this.top = "";
    this.right = "";
    this.bottom = "";
    this.left = "";
    this.center = "";
}

Tooth.prototype.draw = function(svg){
    var x = this.x;
    var y = this.y;
    
    var polygon = svg.polygon(COORDS[this.size])
    polygon.fill('#f06').move(x, y);
    polygon.click(function() {
        this.fill({ color: '#006' })
    })
    this.top = polygon;
    
    var w = polygon.bbox().w;
    var h = polygon.bbox().h;
    var hx = w / 2;
    var hy = h / 2;
    
    // right
    var dx = hx-hy;
    var dy = hx-hy;
    
    polygon = svg.polygon(COORDS[this.size])
    polygon.fill('#906').move(x+dx, y+dy);
    polygon.transform({ rotation: 90 });
    this.righ = polygon;
    
    // bottom
    dx = 0;
    dy = 2*hx-2*hy;
    
    polygon = svg.polygon(COORDS[this.size])
    polygon.fill('#f76').move(x+dx, y+dy);
    polygon.transform({ rotation: 180 });
    this.bottom = polygon;
    
    // left
    dx = -hx+hy;
    dy = hx-hy;
    
    polygon = svg.polygon(COORDS[this.size])
    polygon.fill('#676').move(x+dx, y+dy);
    polygon.transform({ rotation: -90 });
    this.left = polygon;
    
    // center
    dx = h;
    dy = h;
    var a = w - 2*h;
    var coords = '0,0 '+a+',0 '+a+','+a+' 0,'+a;
    polygon = svg.polygon(coords)
    polygon.fill('#ccc').move(x+dx, y+dy);
    polygon.transform({ rotation: -90 });
    
    this.center = "";
};



function testownia()
{
    var width = 1100;
    var height = 400;
    var draw = SVG('drawing').size(width, height)
    
    var t = new Tooth(1, 20, 40, 1);
    t.draw(draw);
    
//    var text = draw.text('I know that eggs do well to stay out of frying pans.')
//    text.move(20,20).font({ fill: '#f06', family: 'Inconsolata' })
    
//    polygon.click(function() {
//        this.fill({ color: '#006' })
//    })
}

window.onload = testownia
