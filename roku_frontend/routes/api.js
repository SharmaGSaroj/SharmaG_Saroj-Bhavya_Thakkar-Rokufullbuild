const express = require('express');
const router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

// by default, you can't access other websites or their internal contents if you're not part of that site (have the same origin). This is the default behavior for the web - web spaces are like locked-down building. You need special access to retrieve/use APIs, services etc. The http-proxy-middleware library is like a swipe card that gives you that access with a bit of configuation - it tells the third party (in this case our Node DB service) to allow you to retrieve data, use its services etc. 

router.use('/', createProxyMiddleware({
    target: 'http://localhost:5050', 
    headers: {
        accept: 'application/json, application/x-www-form-urlencoded' //what are we going send thr, i.e json and form
    },
    changeOrigin: true
}))

module.exports = router;