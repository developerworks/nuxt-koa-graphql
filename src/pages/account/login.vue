<template>
    <b-form @submit.prevent="login">
        <b-form-group
                label="Email:"
                label-for="email"
                description="Email tài khoản thường có dạng abc@gmail.com">
            <b-form-input
                    id="email"
                    type="text"
                    required
                    v-model="user.usernameOrEmail"
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
    import gql from 'graphql-tag';
    import loginMutation from '~/apollo/queries/login.gql';

    export default {
        layout: 'account',
        middleware: 'needNotLogin',
        apollo: {

        },
        data() {
            return {
                user: {
                    usernameOrEmail: null,
                    password: null,
                    remember: true,
                }
            }
        },
        methods: {
            login() {
                const vm = this;

                this.$apollo.mutate({
                    mutation: loginMutation,
                    variables: {
                        usernameOrEmail: this.user.usernameOrEmail,
                        password: this.user.password,
                    },
                    update(ctx, {data}) {
                        vm.$store.dispatch('account/login', data.login);
                    }
                });

                //this.$store.dispatch('account/login', this.user);
            }
        }
    }
</script>