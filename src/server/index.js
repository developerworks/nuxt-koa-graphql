import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import { Nuxt, Builder } from 'nuxt';
import api from './api';
import { connect } from './db';

const app = new Koa();

const host = process.env.host || '127.0.0.1';
const port = process.env.port || 3000;

app.use(cors());
app.use(bodyParser());

connect();

app.use(api.routes());
app.use(api.allowedMethods());


const config = require('../../nuxt.config.js');
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
        nuxt.render(ctx.req, ctx.res, promise => {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject)
        })
    })
});


app.listen(port, host, (err) => {
    if (err)
        console.error(err);
    else
        console.log(`> Server is listening on ${host}:${port}`);
});