var express = require('express');

var app = express();

var port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.end("Access the api properly:\n\n ie. http://thissite/api/whoami");
});

app.get('/api/whoami', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || 
      req.connection.remoteAddress || 
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    var language = req.headers['accept-language'].match(/^[^,]+/)[0];
    var systemName = req.headers['user-agent'].replace(/^[^(]*\(([^)]*)\).*/,"$1");
    
    var result = {
        "ipaddress": ip,
        "language": language,
        "software": systemName
    };
    res.json(result);
});

app.listen(port, (err, res) => {
    if (err) throw err;
    console.log("Listening on " + port);
})