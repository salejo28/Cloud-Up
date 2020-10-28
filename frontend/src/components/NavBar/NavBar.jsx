import React from 'react';
import { Link } from 'react-router-dom'

import { isAuthenticate } from '../../auth/auth';
import styles from './NavBar.module.css'


function AuthLinks() {
    return (
        <ul>
            <li>
                <Link to="/profile" >Perfil</Link>
            </li>
            <li>
                <Link to="/folders" >Carpetas</Link>
            </li>
            <li>
                <Link to="/logout" >Salir</Link>
            </li>
        </ul>
    )
}

function Links() {
    return (
        <ul>
            <li>
                <Link to="/register" >Registrarse</Link>
            </li>
            <li>
                <Link to="/login" >Ingresar</Link>
            </li>
        </ul>
    )
}

/* const auth = () => {
    if (isAuthenticate()) {
        return true
    }

    return false
} */

const AllLinks = () => {
    return isAuthenticate() ? <AuthLinks /> : <Links />
}

class NavBar extends React.Component {

    state = {
        auth: this.props.auth
    }

    render() {
        const { auth } = this.state;
        //console.log(isAuthenticate())

        console.log(this.props)
        return (
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.nav_tilte}>
                        <h2>Cloud <span>Up</span></h2>
                    </div>
                    <div className={styles.nav_links}>
                        <AllLinks />
                    </div>
                </div>
            </nav>
        )
    }


}

export default NavBar;
