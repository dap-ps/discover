let helmet = require('helmet');

class HelmetMiddleware {

    static appendTo(app) {

        // Our api use only internal sources
        // If someone tries to execute an external resource on our api, it wont be executed
        // app.use(helmet.contentSecurityPolicy({
        //     directives: {
        //         defaultSrc: ["'self'"]
        //     }
        // }));

        // Expect-CT protect us from man-in-the-middle-attack over HTTPS
        // It enforce browser to check in CT public log if a requester has a valid certificate
        // TODO: Аdd report endpoint for monitoring if somebody tries to hack/mislead us
        app.use(helmet.expectCt({
            enforce: true,
            maxAge: 60 // 1 minute
        }));

        /*  Default setup

        1.  Turn DNS prefetching off -> does not convert domain to address
            example.com in 93.184.216.34
        2.  Nobody except us can put our api in an iframe
        3.  X-Powered-By header is hidden and now express is not shown in the requests
        4.  Tells browsers to stick with HTTPS and never visit the insecure HTTP version
        5.  Untrusted HTML files could not be executed in the context of our api
            This is because Internet Explorer functionality...
        6.  Checks that the sending content-type match exactly the format of sending data

        */

        app.use(helmet());
    }
}

module.exports = HelmetMiddleware;    