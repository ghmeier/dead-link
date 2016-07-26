var request = require('request');
var linkscrape = require('linkscrape');
var http = require('http'),
    url = require('url');

var regex = /^(?:ftp|http|https):\/\/(?:[\w\.\-\+]+:{0,1}[\w\.\-\+]*@)?(?:[a-z0-9\-\.]+)(?::[0-9]+)?(?:\/|\/(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+)|\?(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+))?$/i
var val = 0;

function deadLink(link, cb) {
    request.get(link, function(err, res, body) {
        linkscrape(link, body, function(links) {
            var successes = 0;
            var fails = 0;
            var results = [];
            for (var i=0; i<links.length; i++){
                var cur = links[i].href;
                if (cur && cur.match(regex)) {
                    var parsed = url.parse(cur);
                    results.push(parsed);
                }
            }

            for (var i=0; i<results.length; i++) {
                var cur = results[i];
                urlExists(cur, cb);
            }
        });
    });
}

function urlExists(Url) {
    var options = {
        method: 'HEAD',
        host: Url.host,
        port: 80,
        path: Url.pathname
    };
    var req = http.request(options, function (r) {
        req.destroy();
    });
    req.on('error', function(err) {
        val++;
        console.log(Url.href);
    });
    req.end();
    return;
}
