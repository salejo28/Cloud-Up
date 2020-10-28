import React from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid'
import decode from 'jwt-decode';

import api from '../../service/Dir';
import styles from './Dir.module.css'
import Dirent from './Dirent';

fontawesome.library.add(faPlus);

export default class Dir extends React.Component {

    state = {
        loading: true,
        dir: {},
    }

    componentDidMount() {
        this.loadContent();
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000)
    }

    async loadContent() {
        const token = localStorage.getItem('token');
        try {
            const path = this.props.match.params.path
            const dir = await api.getContent(path || '', token);
            this.setState({
                dir
            })
        } catch (error) {
            console.log(error)
        }
    }

    fillContent() {
        if (this.state.loading) {
            return console.log('cargando')
        }
        const token = localStorage.getItem('token')
        const decodeToken = decode(token)
        const content = this.state.dir.content
        const path = this.props.match.params.path
        const dirPath = this.state.dir.dirPath

        const directories = [
            <Dirent
                name="Up a dir"
                key="parent"
                isDirectory
                parentDirectory
                path={path}
            />,
        ]

        content.dirs.forEach(dir => {
            directories.push(<Dirent name={dir} isDirectory key={dir} path={path} />)
        })

        const files = content.files.map(file => (
            <Dirent name={file} key={file} path={path} _id={decodeToken._id} />
        ))

        return [...directories, ...files]

    }

    render() {
        return (
            <div className="container">

                <div className={styles.content_dirent}>
                    {this.fillContent()}      
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