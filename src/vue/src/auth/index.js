

// URL and endpoint constants
const API_URL = 'http://localhost/api/index.php'
const LOGIN_URL = API_URL
const SIGNUP_URL = API_URL


export default {

    // User object will let us check authentication status
    user: {
        authenticated: false
    },

    // Send a request to the login URL and save the returned JWT
    login(context, creds, redirect) {


        context.$http.post(LOGIN_URL, creds).then(rs => {
            
            console.log(rs.data);
            // localStorage.setItem('id_token', data.id_token)
            // localStorage.setItem('access_token', data.access_token)

            // this.user.authenticated = true

            // // Redirect to a specified route
            // if(redirect) {
            //   router.go(redirect)        
            // }

        }, rs => {
            console.log('error');
        });

    },

    signup(context, creds, redirect) {
        context.$http.post(SIGNUP_URL, creds, (data) => {
            localStorage.setItem('id_token', data.id_token)
            localStorage.setItem('access_token', data.access_token)

            this.user.authenticated = true

            if(redirect) {
                router.go(redirect)        
            }

        }).error((err) => {
            context.error = err
        })
    },

    // To log out, we just need to remove the token
    logout() {
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        this.user.authenticated = false
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if(jwt) {
            this.user.authenticated = true
        }
        else {
            this.user.authenticated = false      
        }
    },

    // The object to be passed as a header for authenticated requests
    getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }
}
