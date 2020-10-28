import axios from 'axios';


class ApiUser {

    constructor() {
        this.api = 'http://localhost:4000/user/'
    }

    async register(args) {
        return await axios.post(this.api + 'register', args);
    }

    async login(args) {
        return await axios.post(this.api + 'login', args);
    }

    async profile(header) {
        return await axios.get(this.api + 'profile', { headers: { "x-token": header } });
    }

    async logout(header) {
        return await axios.get(this.api + 'logout', { headers: { "x-token": header } });
    }

}

const api = new ApiUser();

export default api;