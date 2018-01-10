var height=800;
var width=800;
var hex = "120,60 90,112 30,112 0,60 30,8 90,8";
var tri = "250,120 100,400 400,400";
var incoming = "500,573.2050807568877 200,400 499.9999999999999,226.7949192431122"
var rotation1 = 0;
var rotation2 = 0;
var rotation3 = 0;
var maxReverse = 0;
//pos 0 - 0r, 145,0t
//pos 1 - 65r, 290,0t
//pos 2 - 120r ; 145,145t ; 430,395mt
//pos 3 - 180r ; -100,0t  ; 420,420mt
//pos 4 - 240r ; -150,-100t ; 395,425mt
//pos 5 - 300r ; 0,145t ; 375,407.5mt


var setupValues = {
    0: {r:0,
        tx:145,
        ty:0,
        mtx: 380,
        mty: 380
    },
    1: {r:60,
        tx:100,
        ty:0,
        mtx: 410,
        mty: 370
    },
    2: {r:120,
        tx:100,
        ty:145,
        mtx: 430,
        mty: 395
    },
    3: {r:180,
        tx:-120,
        ty:0,
        mtx: 420,
        mty: 420
    },
    4: {r:240,
        tx:-150,
        ty:-100,
        mtx: 395,
        mty: 425
    },
    5: {r:300,
        tx:0,
        ty:-145,
        mtx: 375,
        mty: 407.5
}};

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border","2px solid");

svg.append("rect")
    .attr("width", width)
    .attr("height", height);

var hex1 = svg.append("polygon")
    .attr("transform", "rotate(30,400,400) translate(340,340)")
    .attr("class", "hex")
    .attr("points",hex)
    .attr("stroke-width",2)
    .attr("stroke","#000")
    .attr("fill-opacity",.2);

var hex3 = svg.append("polygon")
    .attr("transform", "rotate(30,400,400) translate(355,355) scale(.75)")
    .attr("class", "hex")
    .attr("id", "ship")
    .attr("points",hex)
    .attr("fill-opacity",0);
var hex2 = svg.append("polygon")
    .attr("transform", "rotate(30,400,400) translate(310,310) scale(1.5)")
    .attr("class", "hex")
    .attr("points",hex)
    .attr("stroke-width",2)
    .attr("stroke","#000")
    .attr("fill-opacity",.2);

var tri1 = svg.append("polygon")
    .attr("transform", "rotate("+rotation3 +",400,400) translate(387.5,337.5) scale(.05)")
    .attr("class", "tri")
    .attr("points",tri)
    .attr("stroke-width",2)
    .attr("stroke","#000")
    .attr("fill-opacity",1);

var block1 = svg.append("line")
    .attr("transform", "rotate("+ rotation1 + ",400,400) translate(400,400)")
    .attr("x1",-52.5)
    .attr("y1",-37.5)
    .attr("x2",-5)
    .attr("y2",-65)
    .attr("stroke-width",5)
    .attr("stroke","#000");

var block2 = svg.append("line")
    .attr("transform", "rotate(" + rotation2 + ",400,400) translate(400,400)")
    .attr("x1",52.5)
    .attr("y1",-37.5)
    .attr("x2",5)
    .attr("y2",-65)
    .attr("stroke-width",5)
    .attr("stroke","#000");

function getKeyAndMove(e){
    var key_code=e.which||e.keyCode;
    switch(key_code){
        case 37: //left arrow key
            rotation1 = rotation1-60;
            rotation2 = rotation2-60;
            rotation3 = rotation3-60;
            break;
		case 38: //Up arrow key
            if (maxReverse != 0){
                rotation1 = rotation1 + 60;
                rotation2 = rotation2 - 60;
                maxReverse = maxReverse - 1;
            }
            break;
        case 39: //right arrow key
            rotation1 = rotation1+60;
            rotation2 = rotation2+60;
            rotation3 = rotation3+60;
            break;
		case 40: //down arrow key
            if (maxReverse != 2){
                rotation1 = rotation1 - 60;
                rotation2 = rotation2 + 60;
                maxReverse = maxReverse + 1;
            }

            break;
		}
    block1.attr("transform", "rotate("+ rotation1 + ",400,400) translate(400,400)")
    block2.attr("transform", "rotate("+ rotation2 + ",400,400) translate(400,400)")
    tri1.attr("transform", "rotate("+rotation3 +",400,400) translate(387.5,337.5) scale(.05)")
	}



function intersectRect(r1, r2) {
    var r1 = r1.getBoundingClientRect();    //BOUNDING BOX OF THE FIRST OBJECT
    var r2 = r2.getBoundingClientRect();    //BOUNDING BOX OF THE SECOND OBJECT


    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}
var myVar = setInterval(henlo,100);
var allLines = svg.selectAll("line")[0];
var ship = svg.select("#ship")[0][0];
var blocker1 = allLines[0];
var blocker2 = allLines[1];

function henlo() {
    var incoming_projectile = svg.selectAll(".tri_in");
    incoming_projectile[0].map(function(d,i){
        a=intersectRect(incoming_projectile[0][i],blocker1);
        if(a){
            incoming_projectile[0][i].remove();
    }
        a=intersectRect(incoming_projectile[0][i],blocker2);
        if(a){
            incoming_projectile[0][i].remove();
    }
        a=intersectRect(incoming_projectile[0][i],ship);
        if(a){
            incoming_projectile[0][i].remove();
            console.log("HIT");
            removeHealth();
    }
    })



}

var a =[0,60,120,180,240,300];
var health = svg.selectAll(".hbar").data(a);

health.enter().insert("line")
    .attr("transform", function(d,i){return "rotate(" + d + ",400,400) translate(400,400) scale(.5)"})
    .attr("class", "hbar")
    .attr("x1",52)
    .attr("y1",-37)
    .attr("x2",7.5)
    .attr("y2",-62.5)
    .attr("stroke", "#000")
    .attr("opacity", .8)
    .attr("stroke-width",8);
function createTri(direction){
    //r - rotation
    //tx - translate x
    //ty - translate y
    //mtx - middle translate x
    //mty - middle translate y
    d = setupValues[direction];
    var currTri = svg.append("polygon")
        .attr("transform", `translate(${d.tx},${d.ty}) rotate(${d.r},400,400) scale(.05)`)
        .attr("id","tri2")
        .attr("class", "tri_in")
        .attr("points",incoming)
        .attr("stroke-width",2)
        .attr("stroke","#000")
        .attr("fill-opacity",1);

    currTri
        .transition()
        .attr("transform",`translate(${d.mtx},${d.mty}) rotate(${d.r}) scale(.05)`)
        .duration(2000)
        .ease("linear");
}
createTri(0);
createTri(1);
createTri(2);
createTri(3);
createTri(4);
createTri(5);

function removeHealth(){
    h = health[0].pop();
    h.setAttribute("class","depleted_h");
    beep();
}

/*
var tri2 = svg.append("polygon")
    .attr("transform", "translate(-150,-100) rotate(240,400,400) scale(.05)")
    .attr("id","tri2")
    .attr("class", "tri_in")
    .attr("points",incoming)
    .attr("stroke-width",2)
    .attr("stroke","#000")
    .attr("fill-opacity",1);

d3.select("#tri2")
    .transition()
    .attr("transform","translate(395,425) rotate(240) scale(.05)")
    .duration(2000)
    .ease("linear");


        svg.append("rect")
        .attr("width",r2.width)
        .attr("height",r2.height)
        .attr("x",r2.x)
        .attr("y",r2.y)
        .attr("stroke-width",2)
        .attr("stroke","#000");
    svg.append("rect")
        .attr("width",r1.width)
        .attr("height",r1.height)
        .attr("x",r1.x+50)
        .attr("y",r1.y)
        .attr("stroke-width",2)
        .attr("stroke","#000");
    */

function beep() {
    var snd = new  Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}
