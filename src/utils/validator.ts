import { CreateUserInput } from "../services/user.service"

interface Output {
    errors: {
        username: string
        email: string
        password: string
    },
    valid: boolean
}

export const validateRegisterInput = ({ username, email, password, confirmPassword }: CreateUserInput): Output  =>  {
    const errors = {} as any

    if (username.trim() === '') errors.username = 'Username must not be empty'

    if (email.trim() === '') {
        errors.email = 'Email must not be empty'
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/

        if (!email.match(regEx)) errors.mail = 'Email must be a valid email address'
    }

    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'

    return {
        errors,
        valid: Object.keys(errors).length < 1
    } 

}