<template>
    <div>
        <form method="post" class="form-styl">
            <label class="field-box">
                <span class="name">E-mail:</span>
                <input type="text" name = 'user' v-model="user" class="field">
            </label>
            <label class="field-box">
                <span class="name">Senha:</span>
                <input type="password" name = 'pass' v-model="pass" class="field">
            </label>

            <div class="alert alert-danger" v-if="error">
                <p>{{ error }}</p>
            </div>

            <button class="btn-main -full" type = 'button' v-on:click="sendFormLogin">Entrar</button>
            
            <a href="forget-password.html" class="forgetpass">Esqueceu sua senha?</a>
        </form>
    </div>
</template>

<script>

import auth from '../auth'
    
export default {

    name: 'login',
    
    data() {
        return {
            credentials: {
                user: '',
                pass: ''
            },
            error: ''
        }
    },

    methods: {

        sendFormLogin() {

            var obj = {
                user: this.user,
                pass: this.pass
            }
            
            auth.login(this, obj, 'secretquote')

        }
    }
}

</script>

