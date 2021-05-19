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
    updateRequestBuffer(state, payload) {
      state.requestBuffer = payload
    }
  },
  actions: {
    fetchTodos({ commit }) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/')
        .then(res => {
          const splicedTodos = res.data.splice(0, 3)
          commit('updateTodos', splicedTodos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTodo({ commit }, payload) {
      commit('updateRequestBuffer', true)
      axios
        .post('https://jsonplaceholder.typicode.com/todos', payload)
        .then(res => {
          console.log(res)
          commit('addTodo', res.data)
          commit('updateRequestBuffer', false)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
