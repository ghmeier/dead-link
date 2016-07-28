var linkscrape = require('linkscrape'),
    a = require('assert-exists'),
    http = require('http'),
    url = require('url');
var eMsg = a.msg('DeadLink');

module.exports.check = deadLink;
module.exports.validate = validate;
module.exports.visit = visit;
module.exports.urlExists = urlExists;

function deadLink(link, cbs) {
    var parsedLink = url.parse(link);
    a.exists(parsedLink.hostname, eMsg('hostname'));
    if (!cbs) {
        cbs = {};
    }

    var options = {
        method: 'GET',
        hostname: parsedLink.hostname,
        path: parsedLink.pathname,
        port: 80
    };
    var req = http.request(options, function(r) {
        body = '';
        r.on('data', function(d) {
            body += d;
        });
        r.on('end', function() {
            linkscrape(link, body, function(links) {
                visit(validate(links), cbs.success, cbs.failure);
                if (typeof cbs.finished === 'function') {
                    cbs.finished(links);
                }
            });
        });
    });
    req.end();
}

function validate(links) {
    var results = [];
    for (var i=0; i<links.length; i++){
        if (links[i].href) {
            var cur = url.parse(links[i].href);
            if (!cur.hostname){
                continue;
            }
            results.push(cur);
        }
    }
    return results;
}

function visit(links, success, failure) {
    for (var i=0; i<links.length; i++) {
        var cur = links[i];
        urlExists(cur, function(exists, uri) {
            if (!exists) {
                if (typeof failure === 'function') {
                    failure(uri);
                }
            } else {
                if (typeof success === 'function') {
                    success(uri);
                }
            }
        });
    }
}

function urlExists(uri, cb) {
    var options = {
        method: 'HEAD',
        hostname: uri.hostname,
        port: 80,
        path: uri.pathname
    };
    var req = http.request(options, function (r) {
        r.destroy();
        cb(true, uri);

    });
    req.on('error', function(err) {
        cb(false, uri);
    });
    req.end();
    return;
}
