var chrono = require("chrono-node");
var express = require('express');
var router = express.Router();

router.use('/', express.static(__dirname + '/static/'));

router.get('/v:version/:time', function(request, response) {
  if(request.params.version !='1' && request.params.version != '2'){
    response.status(404);
    response.send('Invalid version');
    return;
  } 
  var result = {}; 
  if (isNaN(request.params.time)) {
    var natureDate = chrono.parseDate(request.params.time);
    if (!natureDate) {
      result.unix = null;
      result.natural = null;
    }else{
      result.unix= natureDate.getTime()/1000;
      if(request.params.version == '1'){
        result.natural = natureDate.toDateString();
      }else{
        result.natural = natureDate.toLocaleDateString('en-US', { day : 'numeric', month : 'long', year : 'numeric'});
      }
    }
  }else{
      result.unix = Number(request.params.time);
      if(request.params.version == '1'){
        result.natural = new Date(Number(request.params.time*1000)).toDateString();
      }else{
        result.natural = new Date(Number(request.params.time*1000)).toLocaleDateString('en-US', { day : 'numeric', month : 'long', year : 'numeric'});
      }
  }

  response.setHeader('Content-Type', 'application/json');
  response.json(result);
});

module.exports = router;
