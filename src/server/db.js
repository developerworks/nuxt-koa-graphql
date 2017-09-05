import Sequelize from 'sequelize';
import config from '../../database.config.js';
import colors from 'colors';

const dev = !(process.env.NODE_ENV === 'production');

const db = new Sequelize(dev ? config.development : config.production);

export const connect = () => {
    db
    .authenticate()
    .then(() => {
        console.log(colors.green('Connection has been established successfully.'));
    })
    .catch(err => {
        console.error(colors.red('Unable to connect to the database:', err));
        process.exit(1);
    });
};

export default db;