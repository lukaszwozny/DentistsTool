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
    
    this.cross = "";
}

Tooth.prototype.get_defects = function(){
    var defects = 0;
    var white = '#ffffff';
    var old_c = this.attr('fill');
    if (this.top.attr('fill') != white) defects++;
    
    console.log(defects);
}

Tooth.prototype.build_tooth = function(draw, coords){
    this.top = buildPolygon(draw, coords[this.size], "TOP");
    this.right = buildPolygon(draw, coords[this.size], "RIGHT");
    this.bottom = buildPolygon(draw, coords[this.size], "BOTTOM");
    this.left = buildPolygon(draw, coords[this.size], "LEFT");
    this.center = buildPolygon(draw, coords[this.size], "CENTER");
    
    // Text
    var text = draw.text(''+this.id);
    var dx = (this.top.bbox().width - text.bbox().width)/2;
    var dy = -text.bbox().height;
    if(this.id >30 && this.id<50){
        dy = this.left.bbox().height;
    }
    text.move(this.x+dx,this.y+dy).font({ fill: '#999', family: 'Inconsolata' })

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
    
    
    
    // Build cross
    var co = coords2Str(coords[this.size], CROSS_BOX)

    var cross_box = draw.polygon(co);
    cross_box.attr({
        fill: '#fff',
        'fill-opacity': 0,
    })
    cross_box.move(this.x, this.y);

    co = coords2Str(coords[this.size], LINE_LR)
    var line_lr = draw.line(co);
    line_lr.attr({
        fill: '#f00',
        'fill-opacity': 1,
        stroke: '#f00',
        'stroke-width': 9
    })
    line_lr.move(this.x, this.y);

    co = coords2Str(coords[this.size], LINE_RL)
    var line_rl = draw.line(co);
    line_rl.attr({
        fill: '#f00',
        'fill-opacity': 1,
        stroke: '#f00',
        'stroke-width': 9
    })
    line_rl.move(this.x, this.y);

    this.cross = draw.group();
    this.cross.add(cross_box);
    this.cross.add(line_lr);
    this.cross.add(line_rl);

    var group = this.group;
    this.cross.click(function(){
        if(TOOL_ID == 4){
            this.hide();
            group.show();
        }
    })
    this.cross.hide();
//        this.group.hide();

    var cross = this.cross;
    this.group.click(function(){
        if(TOOL_ID == 4){
            this.hide();
            cross.show();
        }
    })
}

Tooth.prototype.add_parts_actions = function(func){
    this.top.click(func)
    this.right.click(func)
    this.bottom.click(func)
    this.left.click(func)
    this.center.click(func)
}

