

// URL and endpoint constants
const API_URL = 'http://localhost/api';
const LOGIN_URL = API_URL + '/auth';
const SIGNUP_URL = API_URL + '/user/register';


export default {

    user: {
        authenticated: false
    },

    login(context, creds) {

        context.$http.post(LOGIN_URL, creds).then(rs => {
            
            rs.json().then( data => {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('id_token', data.id_token);
                this.user.authenticated = true;
                location.href = './painel';

            }, rs => { context.setError() });

        }, rs => { context.setError() });

    },


    signup(context, creds) {

        context.$http.post(SIGNUP_URL, creds).then(rs => {
            
            rs.json().then( data => {
                
                if( data.error ) {
                    if( data.existEmail ) context.existEmail = true;
                    return context.setError();
                }

                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('id_token', data.id_token);
                this.user.authenticated = true;
                location.href = './painel';
            
            }, () => { context.setError() });

        }, () => { context.setError() });

    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        this.user.authenticated = false;
        location.href = './login';
    },

    checkAuth() {

        var jwt = localStorage.getItem('id_token');

        if(jwt) this.user.authenticated = true;
        else this.user.authenticated = false;

    },

    getAuthHeader() {
        return {
            'Authorization': 'Bearer {' + localStorage.getItem('access_token') +'}'
        }
    }
}
