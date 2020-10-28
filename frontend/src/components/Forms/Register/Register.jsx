import React from 'react';
import styles from '../Form.module.css'

import api from '../../../service/Users';

class Register extends React.Component {

    state = {
        args: {},
        errors: {}
    }

    componentDidMount() {
        document.getElementById('username').focus()
    }

    validForm() {
        const args = this.state.args;

        if (!args.username || !args.fullname || !args.email || !args.password || !args.cpass) {
            return false;
        }

        return true

    }

    matchPasswords() {
        const args = this.state.args;

        if (args.password !== args.cpass) {
            let data = {};
            data = {
                success: false,
                error: {
                    message: "Las contraseñas no coinciden",
                    path: "password"
                }
            }

            return this.handleError(data);
        } else {
            if (args.password.length < 6) {
                let data = {}
                data = {
                    success: false,
                    error: {
                        message: "La contraseña es muy debil",
                        path: "password"
                    }
                }
                return this.handleError(data);
            }
            let data = {};
            data = {
                success: true,
                error: []
            }
            return this.handleError(data);

        }
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

    handleChange(e) {
        const args = this.state.args;
        const { name, value } = e.target;
        args[name] = value;
        this.setState({
            args
        })

        if (name === "email") {
            this.validEmail(value)
        }

        if (name === "password" || name === "cpass") {
            this.matchPasswords();
        }

    }

    handleError(data) {
        let errors = this.state.errors;

        if (!data.success) {
            errors["error"] = data.error;
            // console.log(errors)
            this.setState({
                errors
            }) 
        } else {
            errors = {};
            this.setState({
                errors
            })
        }

    }

    async onSubmit(e, args) {
        e.preventDefault();
        const res = await api.register(args);
        const { success } = res.data;
        if (!success) {
            this.handleError(res.data)
            document.getElementById(res.data.error.path).focus()
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        const { args, errors } = this.state;
        const errorLenght = Object.entries(errors).length !== 0;
        console.log(errorLenght)

        const validPath = (path) => {
            if (errors.error.path === path) {
                return true
            } 
            return false
        }

        const styleSuccess = () => `${styles.group}`
        const styleError = () => `${styles.group} ${styles.error}`

        console.log(errors)
        return (
            <div className="container">
                <form className={styles.form} onSubmit={e => this.onSubmit(e, args)} >
                    <div className={styles.title_form}>
                        <h2>
                            Sign Up
                        </h2>
                    </div>
                    <div className={
                            errorLenght && validPath("username") ?
                            styleError() :
                            styleSuccess()
                        }>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Username</label>
                        <span className={styles.bar}></span>
                        <small>{ errorLenght && validPath("username") ? errors.error.message : '' }</small>
                    </div>
                    <div className={styles.group}>
                        <input
                            type="text"
                            name="fullname"
                            required
                            id="fullname"
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Fullname</label>
                        <span className={styles.bar}></span>
                    </div>
                    <div className={
                        errorLenght &&
                        validPath("email") ?
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
                        errorLenght &&
                        validPath("password") ?
                        styleError() :
                        styleSuccess() 
                    }
                    >
                        <input
                            type="password"
                            name="password"
                            required
                            id="password"
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Password</label>
                        <span className={styles.bar}></span>
                        <small>
                            {errorLenght && validPath("password") ? errors.error.message : ''}
                        </small>
                    </div>
                    <div className={
                        errorLenght &&
                        validPath("password") ?
                        styleError() :
                        styleSuccess() 
                    }>
                        <input
                            type="password"
                            name="cpass"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <label>Confirm Password</label>
                        <span className={styles.bar}></span>
                        <small>
                            {errorLenght && validPath("password") ? errors.error.message : ''}
                        </small>
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
                        Sign Up
                    </button>

                </form>
            </div>
        )
    }

}

export default Register;
