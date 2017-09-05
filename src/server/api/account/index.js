import Router from 'koa-router';

const router = new Router();

// router.get('/login', function (ctx) {
//     ctx.body = [
//         { id: 1, username: 'lynam', email: 'lynam@live.com' },
//         { id: 2, username: 'hoa', email: 'hoa@live.com' },
//     ];
// });

router.post('/login', context => {

    const user = {
        username: 'admin',
        email: 'admin@admin.com',
    };

    console.log('login...');

    const body = context.request.body;

    // Kiểm tra thông tin user
    if (body.email === 'admin@admin.com' && body.password === '123') {

        // Lưu thông tin user vào session.
        context.session.user = user;

        // trả user về để client xử lý.
        return context.body = user;
    }

    context.status = 401;
    context.body = { message: 'Thông tin đăng nhập không chính xác !' };
});


router.post('/logout', context => {
    delete context.session.user;
    context.body = { ok: true };
});


export default router;

