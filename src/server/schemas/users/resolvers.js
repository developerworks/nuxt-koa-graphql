import User from './model';

export default {
    Query: {

    },
    Mutation: {
        async login(root, { usernameOrEmail, password }, context) {

            console.log('mutation->context.req.session:', context.req.session);
            console.log('mutation->context.session:', context.session);

            if (!usernameOrEmail || !password) {
                context.status = 401;
                context.body = { message: 'Thông tin đăng nhập không chính xác !' };
            }

            const user = await User.find({
                where:{
                    $or: [
                        {
                            username: usernameOrEmail
                        },
                        {
                            email: usernameOrEmail
                        }
                    ]
                }
            });

            if (!user) {
                context.status = 401;
                context.body = { message: 'Không tìm thấy thông tin tài khoản này trong hệ thống !' };
            }

            if (user.password !== password) {
                context.status = 401;
                context.body = { message: 'Mật khẩu đăng nhập không chính xác !' };
            }

            // Lưu thông tin user vào session.
            context.session.user = user;

            // trả user về để client xử lý.
            return context.body = user;
        },

        async register(root, { username, email, password }, context) {

            // validate
            if (!username || !email || !password)
                return new Error('Thông tin đăng ký không hợp lệ !');

            const exist = await User.find({
                where:{
                    $or: [
                        {
                            username: username
                        },
                        {
                            email: email
                        }
                    ]
                }
            });

            if (exist)
                return new Error('Tài khoản này với tên hoặc email đã tồn tại trong hệ thống !');

            return await User.create({
                email,
                username,
                password
            });
        }
    }
};