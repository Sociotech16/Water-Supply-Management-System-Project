import 'whatwg-fetch';

class HttpServices {
    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3000/users')
            .then(response => {
                resolve(response.json());
            })
        });
        return promise;
    }
}

export default HttpServices;