<template>
    <b-form @submit.prevent="login">
        <b-form-group
                label="Email:"
                label-for="email"
                description="Email tài khoản thường có dạng abc@gmail.com">
            <b-form-input
                    id="email"
                    type="email"
                    required
                    v-model="user.email"
                    placeholder="Nhập địa chỉ email..."
            />
        </b-form-group>
        <b-form-group
                label="Mật khẩu:"
                label-for="password">
            <b-form-input
                    id="password"
                    type="password"
                    required
                    v-model="user.password"
                    placeholder="Nhập mật khẩu..."
            />
        </b-form-group>

        <b-form-group id="exampleGroup4">
            <b-form-checkbox v-model="user.remember">Nhớ tài khoản</b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary">
            <i class="fa fa-sign-in"></i> Đăng nhập
        </b-button>
    </b-form>
</template>

<script>
    export default {
        layout: 'account',
        middleware: 'needNotLogin',
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                    remember: true,
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch('account/login', this.user);
            }
        }
    }
</script>