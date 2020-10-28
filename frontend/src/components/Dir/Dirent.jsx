import React, { useState } from 'react';

import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCog, faArrowUp } from '@fortawesome/fontawesome-free-solid';

import styles from './Dir.module.css'

fontawesome.library.add(faFolder, faCog, faArrowUp);


const Options = (props) => {
    console.log('click')
    return (
        <div>
            <h1>Hola</h1>
        </div>
    )

}

const handleClick = () => {
    return <Options />
}

const DirLink = (props) => {

}

const DirCard = (props) => {

    function getType(filename) {
        return filename.split('.').pop()
    }

    console.log(getType('img.png'))

    let img;
    let icon;
    let path;

    if (props.path === undefined) {
        path = ''
    } else {
        path = props.path + '/'
    }

    if (props.name === 'bloqueo.jpeg' ) {
        const srcPath = props._id + "/" + path + props.name
        img = <img src={ require("/home/santiago/storage/" + srcPath) } />
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

            { props.isDirectory ? icon : img }

            <div className={styles.footer}>
                <h1>{props.name}</h1>

                {!props.parentDirectory ? (
                    <div className={styles.options}>
                        <FontAwesomeIcon icon="cog" className={styles.icon_option} onClick={handleClick} />
                    </div>) : (<></>)}
            </div>

        </div>
    )

}

const Dirent = (props) => {
    return (
        <DirCard {...props} />
    )
}

export default Dirent;