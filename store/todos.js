export const state = () => ({
    list: [
        {id: 1, text: 'A', done: false},
        {id: 2, text: 'B', done: false},
        {id: 3, text: 'C', done: false},
    ]
})
export const getters = {
    doneTodos: state => {
        return state.list.filter(list => list.done)
    },
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
        return state.list.find(list => list.id === id).text
    }
}
export const mutations = {
    add(state, text) {
        state.list.push({
            id: 10,
            text,
            done: false
        })
    },
    remove(state, {todo}) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    toggle(state, todo) {
        todo.done = !todo.done
    }
}