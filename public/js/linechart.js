(function() {
  var addButton, c, chart, data, dataGen, i, k, removeButton;

  chart = function(elem) {
    var color, defs, height, line, margin, maxDays, minDays, svg, width, x, xAxis, y, yAxis, zoom;
    margin = {
      top: 20,
      right: 100,
      bottom: 50,
      left: 50
    };
    width = 960 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;
    maxDays = 8;
    minDays = 4;
    x = d3.scale.linear().range([0, width]);
    y = d3.scale.linear().range([height, 0]);
    color = d3.scale.category10();
    xAxis = d3.svg.axis().scale(x).tickFormat(function(d) {
      if (Math.floor(d) !== d) {

      } else {
        return 'day ' + d;
      }
    }).orient("bottom");
    yAxis = d3.svg.axis().scale(y).orient("left");
    line = d3.svg.line().interpolate("linear").x(function(d) {
      return x(d.day);
    }).y(function(d) {
      return y(d.temp);
    });
    zoom = d3.behavior.zoom().x(x).scaleExtent([1, 2]).on('zoom', function() {
      var tx, ty;
      tx = d3.event.translate[0];
      ty = d3.event.translate[1];
      tx = Math.min(1, Math.max(tx, width - Math.round(x(maxDays) - x(1)), width - Math.round(x(maxDays) - x(1)) * d3.event.scale));
      zoom.translate([tx, ty]);
      svg.select('.x.axis').call(xAxis);
      svg.selectAll('.line').attr("d", function(d) {
        return line(d.temps);
      }).style("stroke", function(d) {
        return color(d.name);
      });
      return svg.selectAll('circle.dot').attr('cy', function(d) {
        return y(d.temp);
      }).attr('cx', function(d) {
        return x(d.day);
      }).attr('r', 5);
    });
    svg = d3.select(elem).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    // zoom panel
    svg.append("rect").attr('class', 'zoom-panel').attr("width", width).attr("height", height).call(zoom);
    // clip path  
    defs = svg.append('svg').attr('width', 0).attr('height', 0).append('defs');
    defs.append('clipPath').attr('id', 'clipper').append('rect').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
    // x axis
    svg.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`).call(xAxis);
    
    // y axis
    svg.append("g").attr("class", "y axis").attr("transform", "translate(0,0)").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", -40).attr('x', -180).attr("dy", ".71em").style("text-anchor", "end").text("Temperature");
    return function(data) {
      var city, cityEnter;
      
      // x and y domains
      maxDays = d3.max(data, function(m) {
        return d3.max(m.temps, function(d) {
          return d.day;
        });
      });
      x.domain([1, maxDays]);
      y.domain([
        d3.min(data,
        function(d) {
          return d3.min(d.temps,
        function(t) {
            return t.temp;
          });
        }),
        d3.max(data,
        function(d) {
          return d3.max(d.temps,
        function(t) {
            return t.temp;
          });
        })
      ]);
      
      // zoom factor
      zoom.scaleExtent([1, maxDays / minDays]);
      svg.selectAll('.x.axis').transition().duration(500).call(xAxis);
      svg.selectAll('.y.axis').transition().duration(500).call(yAxis);
      city = svg.selectAll(".city").data(data, function(c) {
        return c.id;
      });
      cityEnter = city.enter().append("g").attr("class", "city");
      
      // line chart: lines  
      cityEnter.append("path").attr('clip-path', 'url(#clipper)').attr("class", "line");
      city.select('path').transition().duration(500).attr("d", function(d) {
        return line(d.temps);
      }).style("stroke", function(d) {
        return color(d.name);
      });
      
      // line chart: dots
      cityEnter.append('g').attr('class', 'dots').attr('clip-path', 'url(#clipper)').selectAll('circle').data(function(d) {
        return d.temps;
      }).enter().append('circle').attr('class', 'dot');
      city.select('.dots').style('stroke', function(d) {
        return color(d.name);
      }).selectAll('circle').transition().duration(500).attr('cy', function(d) {
        return y(d.temp);
      }).attr('cx', function(d) {
        return x(d.day);
      }).attr('r', 5);
      // legend: city name
      cityEnter.append("text").attr('class', 'city-name');
      city.select("text.city-name").attr("x", width + 20).attr("y", function(d, i) {
        return i * 20;
      }).attr("dy", ".35em").text(function(d) {
        return d.name;
      });
      // legend: movie dot color
      cityEnter.append('circle').attr('class', 'city-dot');
      city.select('circle.city-dot').attr('cx', width + 10).attr('cy', function(d, i) {
        return i * 20;
      }).attr('r', 5).style('fill', function(d) {
        return color(d.name);
      });
      // exit 
      city.exit().remove();
      return zoom.x(x);
    };
  };

  // driver part
  dataGen = (function() {
    return (function(id) {
      return function() {
        var data, j, nums, tempSeed;
        nums = Math.ceil(Math.random() * 11) + 4;
        tempSeed = Math.round(Math.random() * 30);
        data = {
          id: id,
          name: `City ${id}`,
          temps: (function() {
            var k, ref, results;
            results = [];
            for (j = k = 1, ref = nums; (1 <= ref ? k <= ref : k >= ref); j = 1 <= ref ? ++k : --k) {
              results.push({
                day: j,
                temp: tempSeed + Math.round(Math.random() * 5)
              });
            }
            return results;
          })()
        };
        id = id + 1;
        return data;
      };
    })(1);
  })();

  data = [];

  for (i = k = 1; k <= 3; i = ++k) {
    data.push(dataGen());
  }

  c = chart('#chart');

  c(data);

  addButton = document.getElementById('add');

  addButton.addEventListener('click', function() {
    data.push(dataGen());
    return c(data);
  });

  removeButton = document.getElementById('remove');

  removeButton.addEventListener('click', function() {
    var index;
    index = Math.floor(Math.random() * data.length);
    data.splice(0, 1);
    return c(data);
  });

}).call(this);