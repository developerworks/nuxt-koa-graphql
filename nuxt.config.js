module.exports = {
    srcDir: "src/",
    loading: {
        color: 'purple'
    },
    head: {
        title: 'Nuxt + Koa starter',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js + Koa project' }
        ],
        link: [
            //{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    css: [
        { src: '~/assets/styles/main.styl', lang: "stylus" }
    ],
    modules: [
        "@nuxtjs/bootstrap-vue",
        "@nuxtjs/axios",
        "@nuxtjs/font-awesome"
    ],
    build: {
        vendor: ['axios'],
        // extend(config, ctx) {
        //
        // }
    }
};