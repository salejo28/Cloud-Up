import React from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid'

import api from '../../service/Dir';
import styles from './Dir.module.css'
import Dirent from './Dirent';

fontawesome.library.add(faPlus);

export default class Dir extends React.Component {

    state = {
        dir: {},
    }

    componentDidMount() {
        this.loadContent();
    }

    async loadContent() {
        const token = localStorage.getItem('token');
        try {
            const dir = await api.getContent(this.props.match.params.path || '', token);
            this.setState({
                dir
            })
        } catch (error) {
            console.log(error)
        }
    }

    async fillContent() {

    }

    render() {
        return (
            <div className="container">

                <div className={styles.content_dirent}>
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                    <Dirent />
                </div>

                <div className={styles.content}>
                    <button className={styles.btn_plus}>
                        <FontAwesomeIcon icon="plus" className={styles.icon} />
                    </button>
                </div>
            </div>
        )
    }

}