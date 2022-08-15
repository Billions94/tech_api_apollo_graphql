import bcrypt from 'bcrypt'

export const hashPassword = (password: string, salt: number ) => bcrypt.hash(password, salt)