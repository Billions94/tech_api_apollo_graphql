import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { verifyJwt } from './jwt.utils'
import { AuthenticationError } from 'apollo-server-core'


export const checkAuth = (context: Request) => {
    // @ts-ignore
    const authorization = context.req.headers.authorization

    if (!authorization) throw new Error(`Authorization header must be provided`)
    const token = authorization!.split('Bearer ')[1]

    if (!token) throw new Error(`Authentication token must be 'Bearer [token]'`)
    try {
        const { decoded } = verifyJwt(token, 'accessTokenPublicKey')
        return decoded
    } catch (error: any) {
        throw new AuthenticationError('Invalid/Expired token provided')
    }
}