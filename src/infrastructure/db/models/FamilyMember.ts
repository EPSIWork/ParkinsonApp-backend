import { DataTypes } from 'sequelize';
import sequelize from '../sequelize';

import User from './User';

const FamilyMember = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    patient: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    helper: {
        type: DataTypes.UUID,
        allowNull: true,
    },
    email : {
        type: DataTypes.STRING,
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
}, {
    tableName: 'messages',
    timestamps: true,
    paranoid: true,
});
FamilyMember.belongsTo(User, { foreignKey: 'user' });
FamilyMember.sync({alter:true}).then(r => {
    console.log(`Message models sync ${r}`);
});
export default FamilyMember;
