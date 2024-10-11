import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address:{
        type: DataTypes.STRING,
        allowNull:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['admin', 'user', 'helper'],
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    credit:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    emailVerifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
});

User.sync({ alter:true }).then(r => {});
export default User;
