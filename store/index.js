export const state = () => ({
    count: 3,
})
export const mutations = {
    increment: state => state.count++,
    decrement: state => state.count--
}