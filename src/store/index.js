import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  getters: {
    getTodos: state => state.todos
  },
  mutations: {
    updateTodos(state, payload) {
      state.todos = payload
    }
  },
  actions: {
    fetchTodos({ commit }) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos/')
        .then(res => {
          const splicedTodos = res.data.splice(0, 10)
          commit('updateTodos', splicedTodos)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
