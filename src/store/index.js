import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    requestBuffer: false
  },
  getters: {
    todos: state => state.todos,
    requestBuffer: state => state.requestBuffer
  },
  mutations: {
    updateTodos(state, payload) {
      state.todos = payload
    },
    addTodo(state, payload) {
      state.todos.push(payload)
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(x => x.id !== id)
    },
    updateRequestBuffer(state, payload) {
      state.requestBuffer = payload
    }
  },
  actions: {
    fetchTodos({ commit }) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(res => {
          const splicedTodos = res.data.splice(0, 3)
          for (const todo of splicedTodos) {
            todo.show = true
          }
          commit('updateTodos', splicedTodos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTodo({ commit, getters }, payload) {
      commit('updateRequestBuffer', true)
      axios
        .post('https://jsonplaceholder.typicode.com/todos', payload)
        .then(res => {
          res.data.id = getters.todos.length + 1
          res.data.show = true
          res.data.completed = false
          commit('addTodo', res.data)
          commit('updateRequestBuffer', false)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTodo({ commit }, id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => {
          commit('deleteTodo', id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
