var deadLink = require('./index.js');

var link = process.argv[2];

deadLink.check(link, {success:success, failure:failure, finished:finished});

function success(uri) {
    console.log("It's all ok at "+uri.hostname+uri.path);
}

function failure(uri) {
    console.log("Ya goofed "+uri.hostname);
}

function finished(links) {
    console.log("Checking "+links.length+" links from "+link);
}
