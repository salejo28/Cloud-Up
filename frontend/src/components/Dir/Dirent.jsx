import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCog, faArrowUp, faFilePdf, faDownload, faTrash, faEdit } from '@fortawesome/fontawesome-free-solid';

import styles from './Dir.module.css'

fontawesome.library.add(faFolder, faCog, faArrowUp, faFilePdf, faDownload, faTrash, faEdit);


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
    let path = props.path ? props.path + "/" : '';

    if (props.type === 'image') {
        const srcPath = props._id + path + props.name
        //const src = require(`${srcPath}`)
        img = <img src={require('/home/storage/' + srcPath)} />
    }

    if (props.type === 'pdf') {
        const colorIcon = {color: '#e63946'}
        icon = <FontAwesomeIcon icon="file-pdf" className={styles.icon} style={colorIcon} />
    }

    if (props.isDirectory) {
        icon = <FontAwesomeIcon icon="folder" className={styles.icon} />
    }

    if (props.parentDirectory) {
        const styleIcon = { opacity: 0.5 }
        icon = <FontAwesomeIcon icon="arrow-up" className={styles.icon} style={styleIcon} />
    }

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
                        <button>
                            <FontAwesomeIcon icon="trash" /> Borrar
                        </button>
                    </li>
                </ul>
            </div>
            ) : (
                <div className={styles.options_list}>
                    <ul>
                        <li>
                            <button>
                                <FontAwesomeIcon icon="download" /> Descargar
                            </button>
                        </li>
                        <li>
                            <button>
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
    return (
        <DirCard {...props} />
    )
}

export default Dirent;