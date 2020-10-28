import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Profile.module.css';
import api from '../../service/Users';

export default class Profile extends React.Component {

    state = {
        args: {}
    }

    componentDidMount() {
        window.onload = this.renderData()
    }

    async renderData() {
        let { args } = this.state
        const token = localStorage.getItem('token')
        const res = await api.profile(token)
        args = res.data;
        this.setState({
            args
        })
    }

    render() {

        const { args } = this.state;
        return (
            <div className="container">
                <div className={styles.card}>
                    <div className={styles.data}>
                        <h2><span>Username:</span> {args.username}</h2>
                        <button>Edit</button>
                    </div>
                    <div className={styles.data}>
                        <h2><span>Fullname:</span> {args.fullname}</h2>
                        <button>Edit</button>
                    </div>
                    <div className={styles.data}>
                        <h2><span>Email:</span> {args.email}</h2>
                        <button>Edit</button>
                    </div>

                    <div className={styles.btns}>
                        <button>
                            Change Password
                        </button>
                        <Link to="folders">
                            Mis Archivos
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}