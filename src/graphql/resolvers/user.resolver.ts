import { createUser, findUser, login, updateUser, deleteUser } from "../../services/user.service"
import { UserInputError } from 'apollo-server-express'
import { getUsers } from '../../services/user.service'
import { UserDocument } from "../../schemas/user.schema"

export const err = {
    UserInputError
}


interface RegisterInput {
    registerInput: {
        username: string
        email: string
        password: string
        confirmPassword: string
    }
}

interface UpdateUserInput extends RegisterInput {
    userInput: {
        id?: string
        username: string
        email: string
        password: string
        confirmPassword: string
        firstName: string
        lastName: string
        image: string
    }
}

type ID = {
    id: string
}


export const userResolver = {
    Query: {
        getAllUsers: async () => await getUsers(),
        getUser: async (_: undefined, { id }: ID) => await findUser({ id })

    },
    Mutation: {
        register: async (_: undefined, { registerInput: { username, email, password, confirmPassword } }: RegisterInput) => {
            const registeredUser = await createUser({ username, email, password, confirmPassword })
            return registeredUser
        },
        login: async (_: undefined, { email, password }: { email: string, password: string }) => {
            const loggedInUser = await login({ email, password })
            return loggedInUser
        },
        updateUser: async (_: undefined, { id, userInput }: ID & UpdateUserInput) => {
            return await updateUser({ id }, { ...userInput }, { new: true })
        },
        deleteUser: async (_: undefined, id: ID) => {
            await deleteUser({ id })
            return "User sucessfully deleted"

        }

    }
}