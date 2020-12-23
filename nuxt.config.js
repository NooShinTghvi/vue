import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - pion_parto',
        title: 'pion_parto',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/toast',
        '@nuxtjs/recaptcha'
    ],

    // axios module configuration (https://axios.nuxtjs.org)
    axios: {
        baseURL: 'http://localhost:8000/api', // Used as fallback if no runtime config is provided
    },

    // auth module configuration (https://auth.nuxtjs.org/)
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    required: true,
                    type: 'Bearer',
                    maxAge: 3600,
                    autoFetch: true,
                },
                user: {
                    property: 'user',
                    autoFetch: false
                },
                endpoints: {
                    login: {url: '/login', method: 'post', propertyName: 'token'},
                    user: {url: '/me', method: 'get'},
                    logout: {url: '/logout', method: 'get', propertyName: false},
                }
            }
        }
    },

    // auth module configuration (https://www.npmjs.com/package/vue-toasted)
    toast: {
        position: 'top-right',
        register: [ // Register custom toasts
            {
                name: 'my-error',
                message: 'Oops...Something went wrong',
                options: {
                    type: 'error'
                }
            }
        ]
    },

    // auth module configuration (https://www.npmjs.com/package/@nuxtjs/recaptcha)
    recaptcha: {
        hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
        siteKey: 'YOUR SITE KEY', // Site key for requests
        version: 2, // Version
        size: 'invisible' // Size: 'compact', 'normal', 'invisible' (v2)
    },
    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {}
}
