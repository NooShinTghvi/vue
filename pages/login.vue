<template>
    <div>
        <h1 class="green--text text--darken-2">Login</h1>
        <form>
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="Password"
                required
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                counter=true
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            ></v-text-field>

            <v-btn
                class="mr-4"
                @click="submit"
            >
                submit
            </v-btn>
            <v-btn @click="clear">
                clear
            </v-btn>
        </form>
    </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
    name: "login",
    mixins: [validationMixin],
    validations: {
        email: {required, email},
        password: {required, minLength: minLength(8)}
    },

    data: () => ({
        email: '',
        password: '',
        showPassword: false,
    }),

    computed: {
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required.')
            !this.$v.password.minLength && errors.push('Password must be at at least 8 characters long')
            return errors
        },
    },

    methods: {
        async submit() {
            this.$v.$touch()
            try {
                let response = await this.$auth.loginWith('local', {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                console.log(response)
                console.log(this.$auth.strategy.token.status())
                /*this.$auth.setUser({
                    email: this.email
                })
                    .then(() => this.$toast.success('User set!'))*/
                /*this.$auth.setUserToken(response.data.access_token)
                    .then(() => this.$toast.success('Token User set!'))*/
                if (this.$auth.loggedIn) {
                    console.log('Logged In! ' + this.$auth.token)
                    console.log(this.$auth.user)

                } else {
                    console.log('Not Logged In! ' + this.$auth.strategy.token.get())
                    console.log(this.$auth.user)
                }
            } catch (err) {
                console.log(err)
            }
        },
        async clear() {
            this.$v.$reset()
            this.email = ''
            this.password = ''
            try{ //todo clear
                let response = await this.$auth.user
                console.log('logout')
                console.log(response)
            }catch (e){
                console.log(e)
            }
        },
    }
}
</script>

<style scoped>

</style>