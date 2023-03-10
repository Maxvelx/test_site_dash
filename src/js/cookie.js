const getCookie = (name) => {
    const cookies = Object.assign({}, ...document.cookie.split('; ').map(cookie => {
        const name = cookie.split('=')[0];
        const value = cookie.split('=')[1];

        return {[name]: value};
    }));

    return cookies[name];
};


export default getCookie