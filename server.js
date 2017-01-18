var express = require('express'); 
var app     = express();
var redis   = require('redis'),
    client  = redis.createClient();
var router  = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'WORKING' });	
});

router.post('/package-number/:tenant_id/:prefix', function(req, res) {
  console.log("Asking for a package number for " + req.params.tenant_id + ":" + req.params.prefix);
  client.incr("package-numbers:" + req.params.tenant_id + ":" + req.params.prefix, function(error, result) {
	  res.json({ tenantId: req.params.tenant_id, prefix: req.params.prefix, number: result});
  });
});

app.use('/api', router);
app.listen(8080);
console.log('Listening on 8080...');
