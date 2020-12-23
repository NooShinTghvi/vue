<template>
    <div>
        <h1 class="green--text text--darken-2">Register</h1>
        <form>
            <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="75"
                label="Name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
            ></v-text-field>
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
            <v-text-field
                v-model="password_confirmation"
                :error-messages="password_confirmationError"
                label="Password"
                required
                :type="showCPassword ? 'text' : 'password'"
                :append-icon="showCPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showCPassword = !showCPassword"
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


import {validationMixin} from "vuelidate";
import {email, maxLength, minLength, required, sameAs} from "vuelidate/lib/validators";

export default {
    name: "register",
    mixins: [validationMixin],
    validations: {
        name: {required, maxLength: maxLength(75)},
        email: {required, email},
        password: {required, minLength: minLength(8)},
        password_confirmation: {sameAsPassword: sameAs('password')},
    },

    data: () => ({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        showPassword: false,
        showCPassword: false,
    }),

    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
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
        password_confirmationError() {
            const errors = []
            if (!this.$v.password_confirmation.$dirty) return errors
            !this.$v.password_confirmation.sameAsPassword && errors.push('The password confirmation does not match.')
            return errors
        }
    },

    methods: {
        async submit() {
            this.$v.$touch()
            try {
                let response = await this.$axios.post('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                })
                console.log(response)
                // console.log(this.$auth.strategy.token.status())
                if (response.data.status) {
                    console.log('Good!!')
                    // this.$auth.setUser({
                    //     name: this.name,
                    //     email: this.email,
                    //     password: this.password
                    // })
                    //     .then(() => this.$toast.success('User set!'))
                    // this.$auth.setUserToken(response.data.token)
                    //     .then(() => this.$toast.success('Token User set!'))
                } else {
                    console.log('error!!')
                }

                /*if (this.$auth.loggedIn) {
                    console.log('Logged In! ' + this.$auth.token)
                    console.log(this.$auth.user)

                } else {
                    console.log('Not Logged In! ' + this.$auth.strategy.token.get())
                    console.log(this.$auth.user)
                }*/
            } catch (err) {
                console.log(err)
            }

            // alert('hello')
        },
        async clear() {
            this.$v.$reset()
            this.name = ''
            this.email = ''
            this.password = ''
            this.password_confirmation = ''
        },
    }
}
</script>

<style scoped>

</style>