import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import winston from 'winston';
import koaLogger from 'koa-logger-winston';
import session from 'koa-session';

/*========================================================================================*
 * Create App
 *========================================================================================*/
const app = new Koa();



/*========================================================================================*
 * Setup Logger
 *========================================================================================*/
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'app.log' })
    ]
});

app.use(koaLogger(logger));



/*========================================================================================*
 * Setup middlewares
 *========================================================================================*/
app.use(bodyParser());
app.use(cors());

app.keys = ['!lyN@mIsAwes0m3#'];
app.use(session({
    key: '!lyN@mIsAwes0m3#',
    maxAge: 86400000,
    overwrite: true,
}, app));



/*========================================================================================*
 * Export App
 *========================================================================================*/
export default app;