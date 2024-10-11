import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import { Sequelize } from 'sequelize';
import { config } from '../../config/config';


export const sequelize = new Sequelize(
    config.DB_NAME, 
    config.DB_USER, 
    config.DB_PASSWORD, 
    {
        host: config.DB_HOST,
        dialect: 'postgres',
    }
);

// Define your seeder
// const seedAdminUser = async () => {
//     const hashedPassword = await bcrypt.hash('adminPassword', 8);
//     return sequelize.getQueryInterface().bulkInsert('users', [{
//         id: uuidv4(), // replace it with a real UUID
//         firstName: 'admin',
//         lastName: 'parkinson',
//         password: hashedPassword,
//         phoneNo: '1234567890',
//         email: 'admin@parkinson.com',
//         role: 'admin',
//         status: 'completed',
//         confirmed: true,
//         emailVerifiedAt: new Date(),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }]);
// };

// Run your seeder
// seedAdminUser().catch(console.error);

export default sequelize;