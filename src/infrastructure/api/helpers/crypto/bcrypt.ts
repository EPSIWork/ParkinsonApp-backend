
import bcrypt from 'bcryptjs';

export const verifyPassword = async (password: string, oldPassword: string) => {
    return await bcrypt.compare(password, oldPassword)
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}