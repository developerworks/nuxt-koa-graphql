<template>

    <b-navbar toggleable="md" type="dark" variant="primary">

        <b-container>
            <b-nav-toggle target="nav_collapse"></b-nav-toggle>

            <b-navbar-brand :to="{name: 'index'}">Trang chủ</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-nav is-nav-bar>
                    <b-nav-item :to="{name: 'index'}">Home</b-nav-item>
                </b-nav>

                <!-- Right aligned nav items -->
                <b-nav is-nav-bar class="ml-auto">

                    <b-nav is-nav-bar v-if="user">
                        <b-nav-item :to="{name: 'admin'}">
                            <i class="fa fa-cog"></i> AdminCP
                        </b-nav-item>
                    </b-nav>

                    <b-nav is-nav-bar>
                        <b-nav-item :to="{name: 'account-login'}" v-if="!user">
                            <i class="fa fa-user"></i> Đăng nhập
                        </b-nav-item>
                    </b-nav>

                    <b-nav-item-dropdown :text="username" right v-if="user">
                        <b-dropdown-item href="#">Tài khoản</b-dropdown-item>
                        <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-nav>

            </b-collapse>
        </b-container>
    </b-navbar>

</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.state.account.user;
            },
            username () {
                if(this.user && this.user.username)
                    return this.user.username;
                return "Tài khoản";
            }
        },

        methods: {
            logout() {
                this.$store.dispatch('account/logout');
            }
        }
    }
</script>
