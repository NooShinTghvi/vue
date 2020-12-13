<template>
    <div>
        <v-card>
            <v-card-title>{{ count }}</v-card-title>
            <v-card-actions>
                <V-btn @click="increment">+</V-btn>
                <V-btn @click="decrement">-</V-btn>
            </v-card-actions>
            <v-card-subtitle>
                Check out your cookies to see the updates.
            </v-card-subtitle>
        </v-card>
    </div>

</template>

<script>
export default {
    name: "counter",
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment');
        },
        decrement() {
            this.$store.commit('decrement');
        }
    }
}
</script>

<style scoped>

</style>