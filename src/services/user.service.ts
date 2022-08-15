import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'
import User, { UserDocument } from '../schemas/user.schema'
import bcrypt from 'bcrypt'
import { err } from '../graphql/resolvers/user.resolver'
import dotenv from 'dotenv'
import config from 'config'
import { signJwt } from '../utils/jwt.utils'
import { validateRegisterInput } from '../utils/validator'
import log from '../utils/log'
import { createSession } from './session.service'
dotenv.config()


export interface CreateUserInput {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export const createUser = async ({ username, email, password, confirmPassword }: DocumentDefinition<CreateUserInput>): Promise<UserDocument> => {
    try {
        const { valid, errors } = validateRegisterInput({ username, email, password, confirmPassword })


        if (!valid) {
            throw new err.UserInputError('Errors', { errors })
        }

        const user = await User.findOne({ username })
        if (user) {
            throw new err.UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            })
        }

        const newUser = new User({
            username,
            email,
            password,
            createAt: new Date().toISOString()
        })

        const res = await newUser.save()

        return {
            message: 'User created successfully',
            // @ts-ignore
            ...res._doc,
            id: res._id,
        }
    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}

export const login = async ({ email, password }: { email: string, password: string }): Promise<UserDocument> => {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new err.UserInputError('User not found', {
                error: {
                    message: 'User not found',
                }
            })
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) throw new Error('Invalid credentials')

        const session = await createSession(user._id)

        const token = signJwt({ ...user, session: session },
            "accessTokenPrivateKey",
            { expiresIn: config.get("accessTokenTtl") }) // 15 mins

        const refreshToken = signJwt(
            { ...user, session: session },
            "refreshTokenPrivateKey",
            { expiresIn: config.get("refreshTokenTtl") } // 1 year
        )

        return {
            // @ts-ignore
            ...user._doc,
            id: user._id,
            token,
            refreshToken
        }

    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}


export const getUsers = async () => {
    try {
        return await User.find({})
    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
    try {
        return await User.findOne(query).lean()
            .populate({ path: 'posts' })
            .populate({ path: 'comments' })
    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}

export const updateUser = async (query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions): Promise<UserDocument | null> => {
    try {
        const user = await User.findOneAndUpdate(query, update, options)
        return user
    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
    try {
        return await User.deleteOne(query)
    } catch (error: any) {
        log.error(error)
        throw new Error(error)
    }
}