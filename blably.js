var alphabet = ["bla", "blu", "blr", "bli", "ble", "blo"];

var svg = d3.select("svg").append("svg")

var pack = d3.pack()
    .size([300, 240])
    .padding(1.5);

redraw(randomizeData());
d3.interval(function(){
    redraw(randomizeData());
}, 1500);

function redraw(classes){

    // transition
    var t = d3.transition()
        .duration(750);

    // hierarchy
    var h = d3.hierarchy({children: classes})
        .sum(function(d) { return d.size; })

    //JOIN
    var circle = svg.selectAll("circle")
        .data(pack(h).leaves(), function(d){ return d.data.name; });

    var text = svg.selectAll("text")
        .data(pack(h).leaves(), function(d){ return d.data.name; });

    //EXIT
    circle.exit()
        .style("fill", "#ffe7e5")
    .transition(t)
        .attr("r", 1e-6)
        .remove();

    text.exit()
    .transition(t)
        .attr("opacity", 1e-6)
        .remove();

    //UPDATE
    circle
    .transition(t)
        .style("fill", "#9e2a2b")
        .attr("r", function(d){ return d.r })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })

    text
    .transition(t)
        .attr("x", function(d){ return d.x-10; })
        .attr("y", function(d){ return d.y+5; });

    //ENTER
    circle.enter().append("circle")
        .attr("r", 1e-6)
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", "#465854")
    .transition(t)
        .style("fill", "#e09f3e")
        .attr("r", function(d){ return d.r });

    text.enter().append("text")
        .attr("opacity", 1e-6)
        .attr("x", function(d){ return d.x-10; })
        .attr("y", function(d){ return d.y+5; })
        .text(function(d){ return d.data.name; })
    .transition(t)
        .attr("opacity", 1);
}

function randomizeData(){
    var d0 = jz.arr.shuffle(alphabet),
    d1 = [],
    d2 = [];
    for (var i = 0; i < jz.num.randBetween(1, alphabet.length); i++){
    d1.push(d0[i]);
    }
    d1.forEach(function(d){
    d2.push({name: d, size: jz.num.randBetween(1, 10)})
    });
    return d2;
}