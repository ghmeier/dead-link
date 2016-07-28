var tape = require('tape');
var url = require('url');
var deadLink = require('./index.js');

tape('testing validate success', function t(assert) {
    var links = [{'href':'http://garretmeier.com'}];

    var result = deadLink.validate(links);
    assert.equal(result[0].hostname, 'garretmeier.com', 'link is valid');
    assert.end();
});

tape('testing validate fail', function t(assert) {
    var links = ['garretmeier'];

    var result = deadLink.validate(links);

    assert.equal(result.length, 0, 'link is not valid');
    assert.end();
});

tape('testing urlExists success', function t(assert) {
    var link = url.parse('http://garretmeier.com');

    var result = deadLink.urlExists(link, function(exists, uri){
        assert.equal(exists, true, 'url should exist');
        assert.end();
    });
});

tape('testing urlExists fail', function t(assert) {
    var link = url.parse('garretmeiercom');

    var result = deadLink.urlExists(link, function(exists, uri){
        assert.equal(exists, false, 'url should not exist');
        assert.end();
    });
});

tape('testing visit success call', function t(assert) {
    var links = [url.parse('http://garretmeier.com')];

    var result = deadLink.visit(links, function(uri){
        assert.ok(uri, 'url should succeed');
        assert.end();
    });
});

tape('testing visit failure call', function t(assert) {
    var links = [url.parse('garretmeiercom')];

    var result = deadLink.visit(links, null, function(uri){
        assert.ok(uri, 'url should fail');
        assert.end();
    });
});

tape('testing deadlink finish', function t(assert) {
    var link = 'http://garretmeier.com';

    deadLink.check(link, {
        finished:function(links){
            assert.ok(links, 'finish with some links');
            assert.end();
        }
    });
});

tape('testing should work with no callbacks', function t(assert) {
    var link = 'http://garretmeier.com';

    deadLink.check(link);
    assert.pass();
    assert.end();
});
