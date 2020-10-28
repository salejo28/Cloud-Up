import React from 'react';
import styles from '../Form.module.css'
import api from '../../../service/Users';

class Login extends React.Component {

    state = {
        args: {},
        errors: {}
    }

    componentDidMount() {
        document.getElementById('email').focus()
    }

    validForm() {
        const { args } = this.state;

        if (!args.email || !args.password) {
            return false
        }

        return true;
    }

    validEmail(email) {
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

        if (!validEmail) {
            let data = {
                success: false,
                error: {
                    message: "Email no valido",
                    path: "email"
                }
            }
            return this.handleError(data)
        }

        let data = {
            success: true,
            error: []
        }
        return this.handleError(data);

    }

    handleChange(input) {
        let { args } = this.state;
        const { name, value } = input.target
        args[name] = value;
        this.setState({
            args
        })

        if (name === "email") {
            this.validEmail(value)
        }
    }

    handleError(data) {
        let { errors } = this.state;
        if (!data.success) {
            errors["error"] = data.error
            this.setState({
                errors
            })
        } else {
            errors = {}
            this.setState({
                errors
            })
        }
    }

    async onSubmit(e, args) {
        e.preventDefault();
        const res = await api.login(args)
        const { success } = res.data;
        if (!success) {
            this.handleError(res.data);
            document.getElementById(res.data.error.path).focus()
        } else {
            localStorage.setItem('token', res.data.token)
            this.props.history.push('/profile');
        }
    }

    render() {
        const { args, errors } = this.state;
        const errorLenght = Object.entries(errors).length !== 0;

        const validPath = (path) => {
            if (errors.error.path === path) {
                return true
            } 
            return false
        }

        const styleSuccess = () => `${styles.group}`
        const styleError = () => `${styles.group} ${styles.error}`

        return (
            <div className="container">
                <form className={styles.form} onSubmit={e => this.onSubmit(e, args)}>
                    <div className={styles.title_form}>
                        <h2>
                            Sign In
                        </h2>
                    </div>

                    <div className={
                            errorLenght && validPath("email") ?
                            styleError() :
                            styleSuccess()
                        }>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Email</label>
                        <span className={styles.bar}></span>
                        <small>{ errorLenght && validPath("email") ? errors.error.message : '' }</small>
                    </div>
                    <div className={
                            errorLenght && validPath("password") ?
                            styleError() :
                            styleSuccess()
                        }>
                        <input
                            type="password"
                            name="password"
                            required
                            id="password"
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Password</label>
                        <span className={styles.bar}></span>
                        <small>{ errorLenght && validPath("password") ? errors.error.message : '' }</small>
                    </div>

                    <button
                        className={
                            !this.validForm() ?
                                `${styles.btn_form} ${styles.disabled}` :
                                errorLenght ?
                                    `${styles.btn_form} ${styles.disabled}` :
                                    `${styles.btn_form}`
                        }
                        type="submit"
                    >
                        Sign In
                    </button>

                </form>
            </div>
        )
    }

}

export default Login;