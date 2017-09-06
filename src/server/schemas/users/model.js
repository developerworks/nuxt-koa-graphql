import db from '../../db';
import Sequelize from 'sequelize';
import colors from 'colors';

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

User.sync({force: true}).then(async () => {
    const count = await User.count();

    if (count <= 0) {
        User.create({
            username: 'admin',
            email: 'admin@admin.com',
            password: 'admin',
        }).then(() => console.log(colors.green(`> Created admin user successfully !`)));
    }
});

export default User;