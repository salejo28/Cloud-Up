import React, { Fragment } from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/fontawesome-free-solid'

import styles from './Modal.module.css';
import MkDir from '../MkDir/MkDir'
import UploadFile from '../UploadFile/UploadFile'

fontawesome.library.add(faArrowRight);

export default class ModalForm extends React.Component {

    state = {
        showMkDir: false,
        showUploadImage: false
    }

    render() {
        const { showMkDir, showUploadImage } = this.state
        return (
            <div className={styles.container_modal}>
                <div className={`${styles.modal}`}>
                    <div className={styles.modal_header}>
                        <h2>Nuevo</h2>
                    </div>
                    {
                        showMkDir ? <MkDir {...this.props} /> :
                        showUploadImage ? <UploadFile {...this.props} /> : (
                                <Fragment>
                                    <button 
                                        className={styles.btn_modal}
                                        onClick={() => this.setState({ showUploadImage: true })}
                                    >
                                        Subir Archivo <FontAwesomeIcon icon="arrow-right" />
                                    </button>
                                    <button 
                                        className={styles.btn_modal}
                                        onClick={() => this.setState({ showMkDir: true })}
                                    >
                                        Crear Carpeta <FontAwesomeIcon icon="arrow-right" />
                                    </button>
                                </Fragment>
                            )
                    }
                </div>
            </div>
        )
    }

}