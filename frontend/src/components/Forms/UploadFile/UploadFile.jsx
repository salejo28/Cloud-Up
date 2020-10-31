import React from 'react'

import styles from '../ModalForm/Modal.module.css'
import api  from '../../../service/Dir'

export default class UploadFile extends React.Component {

    state = {
        files: []
    }

    onChange(e) {
        this.setState({ files: e.target.files })
    }

    async onSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            const data = new FormData()
            for (const file of this.state.files) {
                data.append('file', file)
            }
            const res = await api.uploadFile(this.props.path || '', data, token)
            console.log(res)
            this.props.reload()
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { files } = this.state
        const filesLength = Object.entries(files).length === 0;
        return (
            <form onSubmit={e => this.onSubmit(e)} >
                <div className={styles.group}>
                    <input 
                        type="file"                
                        onChange={e => this.onChange(e)}     
                        multiple     
                    />
                </div>

                <button className={
                    filesLength ? `${styles.btn_form} ${styles.disabled}` : `${styles.btn_form}`
                }>
                    Subir
                </button>
            </form>
        )
    }

}