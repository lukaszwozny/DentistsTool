var COORDS = new Array();
var COORDS_2 = new Array();
var w1 = 100;
var h1 = 25;
COORDS[1] = '0,0 '+w1+',0 '+(w1-h1)+','+h1+' '+h1+','+h1;

COORDS_2[1] = [
    [0,0], [100,0],
    [30,30], [70,30],
    [30,70], [70,70],
    [0,100], [100,100]
];

TOP = [0,1,3,2];
LEFT = [0,2,4,6];
RIGHT = [1,3,5,7];
BOTTOM = [6,4,5,7];
CENTER = [2,3,5,4];

function buildCoords(tab, points)
{
    var coords ='';
    for(i=0; i<points.length; i++){
        var p = points[i];
        coords += tab[p][0]+','+tab[p][1]+' ' 
    }
    return coords;
}

function buildPolygon(draw, tab, side)
{
    var points = '';
    switch(side) {
        case "TOP":
            points = TOP;
            break;
        case "RIGHT":
            points = RIGHT;
            break;
        case "BOTTOM":
            points = BOTTOM;
            break;
        case "LEFT":
            points = LEFT;
            break;
        case "CENTER":
            points = CENTER;
            break;
    }
    var coords = buildCoords(tab, points);
    var polygon = draw.polygon(coords);
    return polygon;
}

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
    
    this.group = "";
}

Tooth.prototype.build_tooth = function(draw){
    this.top = buildPolygon(draw, COORDS_2[this.size], "TOP");
    this.right = buildPolygon(draw, COORDS_2[this.size], "RIGHT");
    this.bottom = buildPolygon(draw, COORDS_2[this.size], "BOTTOM");
    this.left = buildPolygon(draw, COORDS_2[this.size], "LEFT");
    this.center = buildPolygon(draw, COORDS_2[this.size], "CENTER");
    
    this.group = draw.group();
    this.group.add(this.top);
    this.group.add(this.right);
    this.group.add(this.bottom);
    this.group.add(this.left);
    this.group.add(this.center);
    this.group.attr({
        fill: '#fff',
        'fill-opacity': 0.5,
        stroke: '#000',
        'stroke-width': 1
    })
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
    this.right = polygon;
    
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
    this.center = polygon;
    
    this.group =svg.group();
    this.group.add(this.top);
    this.group.add(this.right);
    this.group.add(this.bottom);
    this.group.add(this.left);
    this.group.add(this.center);
    
    this.group.move(40,90).scale(0.9);
    
};



function testownia()
{
    var width = 1100;
    var height = 400;
    var draw = SVG('drawing').size(width, height)
    
    var t = new Tooth(1, 20, 40, 1);
//    t.draw(draw);
    t.build_tooth(draw);
    
//    buildPolygon(draw, COORDS_2[1], 'CENTER');
    
//    var text = draw.text('I know that eggs do well to stay out of frying pans.')
//    text.move(20,20).font({ fill: '#f06', family: 'Inconsolata' })
    
//    polygon.click(function() {
//        this.fill({ color: '#006' })
//    })
}

window.onload = testownia
