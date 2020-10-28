export const validateEmail = (email: string): Boolean => {

    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
    console.log(validEmail)

    if (!validEmail) {
        return false
    }

    return true
}

export const checkFields = (data: any) => {
    let error: any = []

    if (!data.username && !data.fullname && !data.email && !data.password && !data.cpass) {
        return error = {
            message: 'Complete este campo',
            path: ["username", "fullname", "email", "password", "cpass"]
        }
    }

    if (!data.username) {
        return error = {
            message: 'Complete este campo',
            path: "username"
        }
    }

    if (!data.fullname) {
        return error = {
            message: 'Complete este campo',
            path: "fullname"
        }
    }

    if (!data.email) {
        return error = {
            message: 'Complete este campo',
            path: "email"
        }
    }

    if (!data.password) {
        return error = {
            message: 'Complete este campo',
            path: "password"
        }
    }

    if (!data.cpass) {
        return error = {
            message: 'Complete este campo',
            path: "password"
        }
    }

}

export const verifyPassword = (password: string, cpass: string) => {

    let error: any = []

    if (password !== cpass) {
        return error = {
            message: 'Las contraseñas no son iguales',
            path: ["password", "cpass"]
        }
    }

    if (password.length < 6) {
        return error = {
            message: 'La contraseña debe tener almenos 6 caracteres',
            path: "password"
        }
    }

}