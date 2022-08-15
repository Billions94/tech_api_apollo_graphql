import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import { UserDocument } from '../schemas/user.schema'

export const signJwt = (object: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined) => {
    const signingKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

export const verifyJwt = (token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey') => {

    const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii')

    try {
        const decoded = jwt.verify(token, publicKey) as string | JwtPayload | UserDocument 
        return {
            valid: true,
            expired: false,
            decoded,
        };
    } catch (e: any) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        }
    }
}