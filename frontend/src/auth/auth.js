import decode from 'jwt-decode';


export const isAuthenticate = () => {
    const token = localStorage.getItem('token');
    let isValid = true;
    try {
        isValid = decode(token)
    } catch (error) {
        //console.log(error)
        return false
    }

    return isValid;
}