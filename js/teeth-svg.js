var COORDS = new Array();

TOP = [0,1,3,2];
LEFT = [0,2,4,6];
RIGHT = [1,3,5,7];
BOTTOM = [6,4,5,7];
CENTER = [2,3,5,4];

var TEETH = new Array();

function buildCoords(w, h, w1, h1){
    coords = [
        [0,0], [w,0],
        [w1, h1], [w-w1,h1],
        [w1, h-h1], [w-w1,h-h1],
        [0,h], [w,h]
    ]
    return coords;
}

function coords2Str(tab, points)
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
    var coords = coords2Str(tab, points);
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
    this.top = buildPolygon(draw, COORDS[this.size], "TOP");
    this.right = buildPolygon(draw, COORDS[this.size], "RIGHT");
    this.bottom = buildPolygon(draw, COORDS[this.size], "BOTTOM");
    this.left = buildPolygon(draw, COORDS[this.size], "LEFT");
    this.center = buildPolygon(draw, COORDS[this.size], "CENTER");
    
    this.group = draw.group();
    this.group.add(this.top);
    this.group.add(this.right);
    this.group.add(this.bottom);
    this.group.add(this.left);
    this.group.add(this.center);
    this.group.move(this.x, this.y);
    this.group.attr({
        fill: '#fff',
        'fill-opacity': 0.5,
        stroke: '#000',
        'stroke-width': 1
    })
}

function changeColor(){
    this.fill({ color: color })
}

var color = '#009';
Tooth.prototype.add_actions = function(){
    this.top.click(changeColor)
    this.right.click(changeColor)
    this.bottom.click(changeColor)
    this.left.click(changeColor)
    this.center.click(changeColor)
}

function createTooth(id, x, y, size, draw){
    var tooth = new Tooth(id, x, y, size);
    tooth.build_tooth(draw);
    tooth.add_actions();
    TEETH[id] = tooth;
}

function setup()
{
    // create coordinates for tooth sizes
    COORDS[1] = buildCoords(100,100,30,30);
    COORDS[2] = buildCoords(90,100,30,50);
    
    // create draw window
    var width = 1100;
    var height = 400;
    var draw = SVG('drawing').size(width, height)
    
    // init teeth
    createTooth(1, 20, 40, 1, draw);
    createTooth(2, 140, 40, 2, draw);
    
    console.log(TEETH);
}

window.onload = setup
