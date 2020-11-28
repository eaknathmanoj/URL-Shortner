import axios from "axios";

//axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://smll.herokuapp.com';

export function httpAccessor(url, method, data = {}) {
    return new Promise(async function (resolve, reject) {
        if (!!url) {
            axios({
                method: method, url: url, data: data,
            }).then(response => {
                if (!!!response) {
                    reject(new Error('Response not found'))
                }
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        } else {
            reject(new Error('URL not valid'));
        }
    });
}

export function makePOSTCall(url, data) {
    return httpAccessor(url, 'post', data)
}

export function makeGETCall(url, data) {
    return httpAccessor(url, 'get', data)
}
