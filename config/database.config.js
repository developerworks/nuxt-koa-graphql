const { resolve } = require('path');

export default {
    development: {
        dialect: 'sqlite',
        storage: resolve(__dirname, '../data/db.sqlite'),
    },
    production: {
        // host: 'localhost',
        // port: 5432,
        // database: 'website',
        // username: 'root',
        // password: 'root',
        // dialect: 'postgres'
        dialect: 'sqlite',
        storage: resolve(__dirname, '../data/db.sqlite'),
    }
}