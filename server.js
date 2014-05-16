var express   = require("express");
var app       = express();
var http      = require('http');
var request   = require('request');


app.get('/numero/:param', function(req, res){
  var parametro = req.params.param;
  
  var url = 'http://www.qualoperadora.net/';
  
  var j = request.jar();

  var ck = request.cookie("PHPSESSID=pgflhdqa2ltmirougo2cjf79f0;");
  j.add(ck);

  ck = request.cookie("_jsuid=3103488192;");
  j.add(ck);

  ck = request.cookie("USID=3362150133-1399133560.37;");
  j.add(ck);

  ck = request.cookie("_first_pageview=1;");
  j.add(ck);

  ck = request.cookie("heatmaps_g2g_100536567=no;");
  j.add(ck);

  ck = request.cookie("p_cachedDomain=www.qualoperadora.net;");
  j.add(ck);

  ck = request.cookie("p_cachedDeals=%5B%5D;");
  j.add(ck);

  ck = request.cookie("__utma=7597106.1768311926.1399133561.1399147733.1399992202.3;");
  j.add(ck);

  ck = request.cookie("__utmb=7597106.2.10.1399992202;");
  j.add(ck);

  ck = request.cookie("__utmc=7597106;");
  j.add(ck);

  ck = request.cookie("__utmz=7597106.1399133561.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none);");
  j.add(ck);

  ck = request.cookie("_eventqueue=%7B%22heatmap%22%3A%5B%5D%2C%22events%22%3A%5B%5D%7D;");
  j.add(ck);

  ck = request.cookie("__utma=112029058.1497549882.1399133567.1399147736.1399992206.3;");
  j.add(ck);

  ck = request.cookie("__utmb=112029058.2.10.1399992206;");
  j.add(ck);

  ck = request.cookie("__utmc=112029058;");
  j.add(ck);

  ck = request.cookie("__utmz=112029058.1399133567.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)");
  j.add(ck);

  request({
    uri: url,
    headers: {
      'user-agent': req.get('user-agent'),
      'accept-language': req.get('accept-language')
    },
    method: "POST",
    jar: j,
    form: {
      telefone: parametro,
      ref2115: " "
    }

  }, function(error, response, body){
    res.send(response.statusCode);

    if(error){
      res.send(error);
    }
    
    // res.send(body);
  });

});

app.listen(3000);
console.log('starting server at localhost:3000');