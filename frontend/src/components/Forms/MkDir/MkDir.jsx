import React from 'react'

import styles from '../ModalForm/Modal.module.css'
import api from '../../../service/Dir'

export default class MkDir extends React.Component {

    state = {
        name: {},
        errors: {}
    }

    onChange(e) {
        let { name } = this.state

        name[e.target.name] = e.target.value;

        this.setState({
            name
        })
    }

    async onSubmit(e, args) {
        let { errors } = this.state
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            const res = await api.createDir(this.props.path || '', args, token)
            console.log(res)
            if (!res.success) {
                errors['error'] = res.error
                this.setState({
                    errors
                })
            } else {
                this.props.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { name, errors } = this.state;
        const nameLenght = Object.entries(name).length === 0;
        const errorLenght = Object.entries(errors).length !== 0;
        return (
            <form onSubmit={e => this.onSubmit(e, name)}>

                <div className={
                    errorLenght ? `${styles.group} ${styles.error}` : `${styles.group}`
                }>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={e => this.onChange(e)} 
                        required 
                    />
                    <label>Name Dir</label>
                    <span className={styles.bar}></span>
                    <small>{ errorLenght ? errors.error : '' }</small>
                </div>

                <button className={
                    nameLenght ? `${styles.btn_form} ${styles.disabled}` :
                    errorLenght ? `${styles.btn_form} ${styles.disabled}` : `${styles.btn_form}`
                }>
                    Crear
                </button>
            </form>
        )
    }

}