var COORDS = new Array();
var TEETH = new Array();

var TOP = [0,1,3,2];
var LEFT = [0,2,4,6];
var RIGHT = [1,3,5,7];
var BOTTOM = [6,4,5,7];
var CENTER = [2,3,5,4];

var color = 0;

var COLORS = [
    '#000', // black
    '#f00', // red
    '#0f0', // green
    '#00f', // blue
    '#FFF' // white
]

function buildCoords(coords){
    var w = coords[0];
    var h = coords[1];
    var w1 = coords[2];
    var h1 = coords[3];
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
    
    // Text
    var text = draw.text(''+this.id);
    var dx = (this.top.bbox().width - text.bbox().width)/2;
    var dy = text.bbox().height;
    text.move(this.x+dx,this.y-dy).font({ fill: '#999', family: 'Inconsolata' })

    
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
    this.fill({ color: COLORS[color] })
}

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

function create_toolbox(){
    var width = 645;
    var height = 200;
    
    draw = SVG('toolbox').size(width, height);
    
    var title = draw.text('Toolbox');
    var dx = (width - title.bbox().width)/2;
    title.font({ 
        fill: '#999',
        size: 18,
        family: 'Inconsolata' 
    }).move(dx,0);

    var MARGIN = 5;
    var y = title.bbox().height + MARGIN;
    draw_tool(draw, 15, y, 1);
}

function draw_tool(draw, x, y, type)
{
    // BOX
    var w = 70;
    var h = 50
    var rect = draw.rect(w, h);
    rect.radius(10)
    rect.attr({
        fill: '#fff',
        'fill-opacity': 0.5,
        stroke: '#333',
        'stroke-width': 3,
    });
    
    // NAME
    var name = draw.text('Próchnica');
    name.font({ 
        fill: '#333',
        size: 14,
        family: 'Inconsolata' 
    });
    var MARGIN = 3;
    var dx = (w - name.bbox().width)/2;
    var dy = h - name.bbox().height - MARGIN;
    name.move(dx,dy);
    
    // COLOR
    var col_w = w-MARGIN*2;
    var col_h = h - name.bbox().height - 3*MARGIN;
    var col_rect = draw.rect(col_w, col_h);
    col_rect.radius(10)
    col_rect.attr({
        fill: '#f00',
        stroke: '#333',
        'stroke-width': 2,
    });
    dx = (w - col_rect.bbox().width)/2;
    col_rect.move(dx,MARGIN);
    
    var group = draw.group();
    group.add(rect);
    group.add(name);
    group.add(col_rect);
    group.move(x,y);
    
    group.click(function(){
        color = 1;
        this.animate().scale(0.8);
    })
}

function setup()
{
    // create coordinates for tooth sizes
    var coords = new Array();
    coords[1] = [100, 90, 30, 30];
    coords[2] = [60, 90, 20, 30];
    coords[3] = [60, 90, 20, 45];
    COORDS[1] = buildCoords(coords[1]);
    COORDS[2] = buildCoords(coords[2]);
    COORDS[3] = buildCoords(coords[3]);
    
    // create draw window
    var width = 1100;
    var height = 400;
    var draw = SVG('teeth-big').size(width, height);
    
    // init teeth
    createTooth(18, 20, 40, 1, draw);
    createTooth(17, 130, 40, 1, draw);
    createTooth(16, 240, 40, 1, draw);
    
    // toolbox init
    create_toolbox();
}

window.onload = setup
