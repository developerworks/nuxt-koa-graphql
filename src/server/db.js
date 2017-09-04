import Sequelize from 'sequelize';
import config from '../../database.config.js';

const dev = !(process.env.NODE_ENV === 'production');

const db = new Sequelize(dev ? config.development : config.production);

export const connect = () => {
    db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });
};

export default db;