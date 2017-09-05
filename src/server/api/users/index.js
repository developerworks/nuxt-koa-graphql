import Router from 'koa-router';

const router = new Router({
    prefix: '/users',
});

router.get('/', function (ctx) {
    ctx.body = [
        { id: 1, username: 'lynam', email: 'lynam@live.com' },
        { id: 2, username: 'hoa', email: 'hoa@live.com' },
    ];
});

export default router;