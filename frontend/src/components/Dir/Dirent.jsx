import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { saveAs } from 'file-saver'
import api from '../../service/Dir';

import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCog, faArrowUp, faFilePdf, faDownload, faTrash, faEdit, faFileExcel, faFileWord } from '@fortawesome/fontawesome-free-solid';

import styles from './Dir.module.css'

fontawesome.library.add(faFolder, faCog, faArrowUp, faFilePdf, faDownload, faTrash, faEdit, faFileExcel, faFileWord);


const DirLink = (props) => {
    let link = `/folders/${props.name}`
    if (props.path) {
        link = `${props.path}-${props.name}`
    }

    if (props.parentDirectory) {
        link = link.split('-').slice(0, -2).join('-') || '/folders/'
    }

    return (
        <Link to={link} >
            {props.children}
        </Link>
    )
}

const DirCard = (props) => {
    const [show, setShow] = useState(false)

    let img;
    let icon;
    let pathS = props.path ? props.path + "/" : '';
    const token = localStorage.getItem('token');

    if (props.type === 'image') {
        const srcPath = props._id + "/" + pathS + props.name
        img = <img src={require('/home/santiago/storage/' + srcPath)} />
    }

    if (props.type === 'pdf') {
        const colorIcon = { color: '#e63946' }
        icon = <FontAwesomeIcon icon="file-pdf" className={styles.icon} style={colorIcon} />
    }
    if (props.type === 'docx') {
        const colorIcon = { color: '#a8dadc' }
        icon = <FontAwesomeIcon icon="file-word" className={styles.icon} style={colorIcon} />
    }
    if (props.type === 'xlsx') {
        const colorIcon = { color: '#40916c' }
        icon = <FontAwesomeIcon icon="file-excel" className={styles.icon} style={colorIcon} />
    }

    if (props.isDirectory) {
        icon = <FontAwesomeIcon icon="folder" className={styles.icon} />
    }

    if (props.parentDirectory) {
        const styleIcon = { opacity: 0.5 }
        icon = <FontAwesomeIcon icon="arrow-up" className={styles.icon} style={styleIcon} />
    }

    const path = props.path ? `${props.path}-${props.name}` : props.name;
    const downloadLink = `http://localhost:4000/files/${path}`;


    return (
        <div className={styles.card}>

            {props.isDirectory ? (
                <DirLink {...props}>
                    {icon}
                </DirLink>
            ) : props.type === "image" ? img : icon}

            <div className={styles.footer}>
                <h1>{props.name}</h1>

                {!props.parentDirectory ? (
                    <div className={styles.options}>
                        <FontAwesomeIcon icon="cog" className={styles.icon_option} onClick={() => setShow(!show)} />
                    </div>) : (<></>)
                }
            </div>

            {show ? props.isDirectory ? (
                <div className={styles.options_list}>
                    <ul>
                        <li>
                            <button>
                                <FontAwesomeIcon icon="edit" /> Editar
                            </button>
                        </li>
                        <li>
                            <button onClick={async e => {
                                e.preventDefault()
                                await api.deleteDir(path, token)
                                props.reload()
                            }}>
                                <FontAwesomeIcon icon="trash" /> Borrar
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                    <div className={styles.options_list}>
                        <ul>
                            <li>
                                <button onClick={() => saveAs(downloadLink, props.name)}>
                                    <FontAwesomeIcon icon="download" /> Descargar
                                </button>
                            </li>
                            <li>
                                <button onClick={async (e) => {
                                    e.preventDefault();
                                    await api.deleteFile(path, token)
                                    props.reload();
                                }}>
                                    <FontAwesomeIcon icon="trash" /> Borrar
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (<></>)}

        </div>
    )

}

const Dirent = (props) => {
    if (!props.path && props.parentDirectory) {
        return <></>;
    }


    return (
        <DirCard {...props} />
    )
}

export default Dirent;