# Dead Link ![Travis Build](https://travis-ci.org/ghmeier/dead-link.svg?branch=master)
A package for checking web pages for dead links.

# Usage
1. Install.
`npm install dead-link --save`

2. Use it.
```javascript
var deadLink = require("dead-link");

deadLink.check('https://google.com', {
    failure: function(uri){
        console.log("You have a dead link");
    }
});
```

# Definition
* `.check(link, callbacks)`
  * Gets all hrefs at the `link` page, and visits them really quickly.
  * `callbacks` is an optional value containing functions that are triggered throughout the proccess
  * `callbacks.succsss(uri)` is called whenever the uri is successfully visited
  * `callbacks.failure(uri)` is called whenever the uri is broken
  * `callbacks.finished(links)` is called whenever links are retrieved from the initial page.

Check out [example.js](https://github.com/ghmeier/dead-link/blob/master/example.js) to see usage.

# Why
I see too many sites with links that are broken. Use this to make something that checks your site automagically. Please. 

No more dead links.
