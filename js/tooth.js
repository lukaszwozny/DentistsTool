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
    
    this.mleczak = false;
}

Tooth.prototype.get_defects = function(){
    var defects = 0;
    var white = '#ffffff';
    var old_c = this.attr('fill');
    if (this.top.attr('fill') != white) defects++;
    
    console.log(defects);
}

Tooth.prototype.build_tooth = function(draw, coords){
    // Build cross
    var co = coords2Str(coords[this.size], CROSS_BOX)

    var cross_box = draw.polygon(co);
    cross_box.attr({
        fill: '#555',
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

    var instance = this;
    this.cross.click(function(){
        if(TOOL_ID == 4){
            this.hide();
            instance.group.show();
        }
    })
    this.cross.hide();
    
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
        fill: '#ffffff',
        'fill-opacity': 0.7,
        stroke: '#000',
        'stroke-width': 1
    })
//        this.group.hide();

    this.group.click(function(){
        switch(TOOL_ID){
            case 4:
                this.hide();
                instance.cross.show();
                break;
            case 5:
                if(!instance.mleczak && (instance.id%10) <= 5){
                    this.scale(0.8);
                    instance.mleczak = true;
                } else {
                    this.scale(1);
                    instance.mleczak = false;
                }
                break;
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

