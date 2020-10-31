import React, { Fragment } from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/fontawesome-free-solid'
import decode from 'jwt-decode';

import api from '../../service/Dir';
import styles from './Dir.module.css'
import Dirent from './Dirent';
import Loading from '../Loading/Loading'
import ModalForm from '../Forms/ModalForm/Modal'

fontawesome.library.add(faPlus, faTimes);

export default class Dir extends React.Component {

    state = {
        loading: true,
        dir: {},
        showModal: false
    }

    getType(filename) {
        return filename.split('.').pop()
    }

    componentDidMount() {
        this.loadContent();
    }

    reload() {
        this.setState({ loading: true })
        this.loadContent();
    }

    async loadContent() {
        const token = localStorage.getItem('token');
        try {
            const path = this.props.match.params.path
            const dir = await api.getContent(path || '', token);
            this.setState({
                dir,
                loading: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    fillContent() {
        if (this.state.loading) {
            return <Loading />
        }
        const token = localStorage.getItem('token')
        const decodeToken = decode(token)
        const content = this.state.dir.content
        const path = this.props.match.params.path
        //const dirPath = this.state.dir.dirPath;
        let type;

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
            directories.push(<Dirent name={dir} isDirectory key={dir} reload={()=>this.reload()} path={path} />)
        })

        const files = content.files.map(file => {
            if (this.getType(file) === 'jpeg' || this.getType(file) === 'png' || this.getType(file) === 'jpg') {
                type = 'image'
            }
            if (this.getType(file) === 'pdf') {
                type = 'pdf'
            }
            if (this.getType(file) === 'docx') {
                type = 'word'
            }
            if (this.getType(file) === 'xlsx') {
                type = 'exel'
            }
            return <Dirent name={file} key={file} reload={()=>this.reload()}  path={path} type={type} _id={decodeToken._id} />
        })

        return [...directories, ...files]

    }

    handleClick() {
        this.setState({
            showModal: true
        })
    }

    render() {
        const { showModal } = this.state
        const path = this.props.match.params.path
        return (
            <Fragment>
                {showModal ? (
                    <div className={styles.content_modal}>
                        <FontAwesomeIcon 
                            icon="times" 
                            className={styles.icon_modal} 
                            onClick={() => this.setState({ showModal: false })}
                        />
                        <ModalForm path={path} reload={() => this.reload()} />
                    </div>
                ) : (<></>)}
                <div className="container">

                    <div className={styles.content_dirent}>
                        {this.fillContent()}
                    </div>

                    <div className={styles.content}>
                        <button className={styles.btn_plus} onClick={() => this.handleClick()}>
                            <FontAwesomeIcon icon="plus" className={styles.icon} />
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }

}