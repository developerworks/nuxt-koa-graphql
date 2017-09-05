export default function ({ store, redirect }) {
    if (!store.state.account.user) {
        redirect('/account/login');
        // error({
        //     message: 'Bạn chưa được cấp phép để sử dụng chức năng này !',
        //     statusCode: 403,
        // });
    }
}