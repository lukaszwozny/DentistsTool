var COORDS = new Array();
var TEETH = new Array();

var TOP = [0,1,3,2];
var LEFT = [0,2,4,6];
var RIGHT = [1,3,5,7];
var BOTTOM = [6,4,5,7];
var CENTER = [2,3,5,4];

var CROSS_BOX = [0, 1, 7, 6];
var LINE_LR = [0, 7];
var LINE_RL = [1, 6];


var COLORS = [
    '#000000', // black
    '#ff0000', // red
    '#00ff00', // green
    '#0000ff', // blue
    '#ffffff' // white
];

var TOOL_ID = 0;
var TOOLS = [
    ['None', '#ffffff'],
    ['Próchnica', '#000000'],
    ['Wypełnienie', '#00ff00'],
    ['Korona', '#0000ff'],
    ['Do usun.', '#ff0000'], // 4 - remove tooth
    ['Mleczny.', '#ffffff'] // 5 - mleczak
];
var TOOLS_GROUPS = [];

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
    polygon.fill('#fff');
    return polygon;
}

function changeColor(){
    if (TOOL_ID != 4 && TOOL_ID != 5){
        var c = TOOLS[TOOL_ID][1];
        var old_c = this.attr('fill');
        if(old_c == c) this.fill({ color: TOOLS[0][1] });
        else this.fill({ color: TOOLS[TOOL_ID][1] });
    }
}

function createTooth(id, x, y, size, draw){
    var tooth = new Tooth(id, x, y, size);
    tooth.build_tooth(draw, COORDS);
    tooth.add_parts_actions(changeColor);
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
    var X = 15;
    var OFFSET = 80;
    for(i=1; i<=5; i++){
        draw_tool(draw, X+(i-1)*OFFSET, y, i);
    }
}

function draw_tool(draw, x, y, type)
{
    var text = TOOLS[type][0];
    var color = TOOLS[type][1];
    
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
    var name = draw.text(text);
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
        fill: color,
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
        if (type != TOOL_ID){ // select
            if(TOOL_ID != 0) TOOLS_GROUPS[TOOL_ID].animate().scale(1.0);
            TOOL_ID = type;
            this.animate().scale(0.8);
        } else { // unselect
            this.animate().scale(1.0);
            TOOL_ID = 0;
        }
    })
    
    TOOLS_GROUPS[type] = group;
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
    var width = 1400;
    var height = 400;
    var draw = SVG('teeth-big').size(width, height);
    
    // init teeth
    var MARGIN = 10;
    var dx = MARGIN;
    var dx1 = coords[1][0] + MARGIN;
    var dx2 = coords[2][0] + MARGIN;
    var dx3 = coords[3][0] + MARGIN;
    var dy = 40;
    
    // top left
    createTooth(18, dx, dy, 1, draw); dx+=dx1;
    createTooth(17, dx, dy, 1, draw); dx+=dx1;
    createTooth(16, dx, dy, 1, draw); dx+=dx1;
    createTooth(15, dx, dy, 2, draw); dx+=dx2;
    createTooth(14, dx, dy, 2, draw); dx+=dx2;
    createTooth(13, dx, dy, 3, draw); dx+=dx3;
    createTooth(12, dx, dy, 3, draw); dx+=dx3;
    createTooth(11, dx, dy, 3, draw); dx+=dx3;
    // top right
    createTooth(21, dx, dy, 3, draw); dx+=dx3;
    createTooth(22, dx, dy, 3, draw); dx+=dx3;
    createTooth(23, dx, dy, 3, draw); dx+=dx3;
    createTooth(24, dx, dy, 2, draw); dx+=dx2;
    createTooth(25, dx, dy, 2, draw); dx+=dx2;
    createTooth(26, dx, dy, 1, draw); dx+=dx1;
    createTooth(27, dx, dy, 1, draw); dx+=dx1;
    createTooth(28, dx, dy, 1, draw); dx+=dx1;
    
    // next line
    dx = MARGIN;
    dy += coords[1][1] + 3*MARGIN;
    // bottom left
    createTooth(48, dx, dy, 1, draw); dx+=dx1;
    createTooth(47, dx, dy, 1, draw); dx+=dx1;
    createTooth(46, dx, dy, 1, draw); dx+=dx1;
    createTooth(45, dx, dy, 2, draw); dx+=dx2;
    createTooth(44, dx, dy, 2, draw); dx+=dx2;
    createTooth(43, dx, dy, 3, draw); dx+=dx3;
    createTooth(42, dx, dy, 3, draw); dx+=dx3;
    createTooth(41, dx, dy, 3, draw); dx+=dx3;
    
    // bottom right
    createTooth(31, dx, dy, 3, draw); dx+=dx3;
    createTooth(32, dx, dy, 3, draw); dx+=dx3;
    createTooth(33, dx, dy, 3, draw); dx+=dx3;
    createTooth(34, dx, dy, 2, draw); dx+=dx2;
    createTooth(35, dx, dy, 2, draw); dx+=dx2;
    createTooth(36, dx, dy, 1, draw); dx+=dx1;
    createTooth(37, dx, dy, 1, draw); dx+=dx1;
    createTooth(38, dx, dy, 1, draw); dx+=dx1;
    
    // toolbox init
    create_toolbox();
}

window.onload = setup
