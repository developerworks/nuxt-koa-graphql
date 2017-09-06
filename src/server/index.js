import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import winston from 'winston';
import koaLogger from 'koa-logger-winston';
import session from 'koa-session';
import Router from 'koa-router';
import { Nuxt, Builder } from 'nuxt';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { connect } from './db';
import schema from './schemas';


/*========================================================================================*
 * Setup host & port
 *========================================================================================*/
const host = process.env.host || '127.0.0.1';
const port = process.env.port || 3000;


/*========================================================================================*
 * Create App
 *========================================================================================*/
const app = new Koa();



/*========================================================================================*
 * Setup Logger
 *========================================================================================*/
app.use(koaLogger(new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        //new (winston.transports.File)({ filename: 'app.log' })
    ]
})));


/*========================================================================================*
 * Setup middlewares
 *========================================================================================*/
app.use(bodyParser());
app.use(cors());


/*========================================================================================*
 * Setup session
 *========================================================================================*/
app.keys = ['!lyN@mIsAwes0m3#'];
app.use(session({
    key: 'koa:session',
    maxAge: 86400000,
    overwrite: true,
}, app));



/*========================================================================================*
 * Connect to database
 *========================================================================================*/
connect();



/*========================================================================================*
 * Setup GRAPHQL
 *========================================================================================*/
const router = new Router();
router.all('/graphql', graphqlKoa(ctx => {
    return {
        schema,
        pretty: true,
        context: ctx,
    }
}));
//router.get('/graphql', graphqlKoa({ schema }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());



/*========================================================================================*
 * Setup Nuxt
 *========================================================================================*/
const config = require('../../config/nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');
config.srcDir = 'src/';

const nuxt = new Nuxt(config);

if (config.dev)
    new Builder(nuxt)
        .build()
        .catch(e => {
        console.error(e); // eslint-disable-line no-console
        process.exit(1);
    });

app.use(ctx => {
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve);
        ctx.res.on('finish', resolve);
        ctx.req.session = ctx.session; // for nuxtServerInit
        ctx.req.state = ctx.state; // for nuxtServerInit

        nuxt.render(ctx.req, ctx.res, promise => {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject)
        })
    })
});



/*========================================================================================*
 * Start app
 *========================================================================================*/
app.listen(port, host, (err) => {
    if (err)
        console.error(err);
    else
        console.log(`> Server is listening on ${host}:${port}`);
});