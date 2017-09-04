import Router from 'koa-router';

const router = new Router({
    prefix: '/users',
});

router.get('/', function (ctx, next) {
    ctx.body = {
        message: 'hello users'
    };
});

export default router;