import axios from 'axios';

class Dir {

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:4000/'
    })
  }

  async apiCall(request) {
    try {
      return (await request()).data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  }

  async getContent(path, token) {
    return await this.apiCall(() => this.api.get('dirs/' + `${path}`, { headers: { "x-token": token } }))
  }

  async createDir(path, name, token) {
    return await this.apiCall(() => this.api.post('dirs/' + `${path}`, name, { headers: { "x-token": token } }))
  }

  async uploadFile(path, data, token) {
    return await this.apiCall(() => this.api.post('files/' + `${path}`, data, { headers: { "x-token": token } }))
  }

}

const dir = new Dir();

export default dir;