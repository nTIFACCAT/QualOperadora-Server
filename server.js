var express   = require("express");
var app       = express();
var http      = require('http');
var request   = require('request');
var cheerio = require('cheerio');
var corser = require("corser");

app.use(corser.create());

app.get('/consulta/:param', function(req, res){
  var parametro = req.params.param;
  
  var url = 'http://www.qualoperadora.net/';

  request({
    uri: url,
    headers: {
      'cookie': 'PHPSESSID=pgflhdqa2ltmirougo2cjf79f0; _jsuid=3103488192; USID=3362150133-1399133560.37; _first_pageview=1; heatmaps_g2g_100536567=no; p_cachedDomain=www.qualoperadora.net; p_cachedDeals=%5B%5D; __utma=7597106.1768311926.1399133561.1399147733.1399992202.3; __utmb=7597106.2.10.1399992202; __utmc=7597106; __utmz=7597106.1399133561.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _eventqueue=%7B%22heatmap%22%3A%5B%5D%2C%22events%22%3A%5B%5D%7D; __utma=112029058.1497549882.1399133567.1399147736.1399992206.3; __utmb=112029058.2.10.1399992206; __utmc=112029058; __utmz=112029058.1399133567.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)',
      'user-agent': req.get('user-agent'),
      'accept-language': req.get('accept-language')
    },
    method: "POST",
    form: {
      telefone: parametro,
      ref2115: url
    }

  }, function(error, response, body){
    // res.send(response.statusCode);

    if(error){
      res.send(error);
    }

    if(response.statusCode == 200){
      var $ = cheerio.load(body);
      var resultado = $('#resultado > span')
      var data = {
        telefone: resultado.eq(0).html(),
        operadora: resultado.eq(1).html(),
        portabilidade: resultado.eq(2).text().trim().toLowerCase() == 'sim',
        estado: resultado.eq(3).html()
      }
      console.log(data);
      res.send(data);
    }

  });

});

app.listen(process.env.PORT || 3000);
console.log('starting server at localhost:3000');