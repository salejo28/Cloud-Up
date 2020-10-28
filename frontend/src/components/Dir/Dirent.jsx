import React from 'react';

import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faCog } from '@fortawesome/fontawesome-free-solid';

import styles from './Dir.module.css'

fontawesome.library.add(faFolder, faCog);


const Options = (props) => {
    console.log('click')
    return(
        <div>
            <h1>Hola</h1>
        </div>
    )

}

const handleClick = () => {
    return <Options />
}

const DirCard = (props) => {

    let icon = <FontAwesomeIcon icon="folder" className={styles.icon} />;

    /* if (props.isDirectory) {
        icon = <FontAwesomeIcon icon="folder" />
    } */

    return (
        <div className={styles.card}>

            {icon}

            <div className={styles.footer}>
                <h1>Name</h1>

                <div className={styles.options}>
                    <FontAwesomeIcon icon="cog" className={styles.icon_option} onClick={handleClick} />
                </div>
            </div>

        </div>
    )

}

const Dirent = () => {
    return (
        <DirCard />
    )
}

export default Dirent;