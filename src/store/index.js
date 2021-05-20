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
    updateTodo(state, payload) {
      const todoIndex = state.todos.findIndex(todo => todo.id === payload.id)
      state.todos[todoIndex] = payload
    },
    addTodo(state, payload) {
      state.todos.push(payload)
    },
    deleteTodo(state, id) {
      state.todos[id].show = false
      state.todos.splice(id, 1)
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
          const splicedTodos = res.data.splice(0, 10)
          for (const todo of splicedTodos) {
            todo.show = true
            todo.editMode = false
          }
          commit('updateTodos', splicedTodos)
        })
        .catch(err => {
          console.log(err)
        })
    },
    async addTodo({ commit, getters }, payload) {
      commit('updateRequestBuffer', true)
      return axios
        .post('https://jsonplaceholder.typicode.com/todos', payload)
        .then(res => {
          const todo = res.data
          todo.id = getters.todos.length + 1
          todo.show = false
          todo.completed = false
          todo.editMode = false
          commit('addTodo', todo)
          commit('updateRequestBuffer', false)
          return todo
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateTodo({ commit, dispatch }, payload) {
      if (!payload.editMode) return
      if (payload.title.length === 0) {
        payload.show = false
        dispatch('deleteTodo', payload.id)
      }
      axios
        .put(
          `https://jsonplaceholder.typicode.com/todos/${payload.id}`,
          payload
        )
        .then(res => {
          commit('updateTodo', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTodo({ commit }, payload) {
      axios
        .delete(
          `https://jsonplaceholder.typicode.com/todos/${payload.todoData.id}`
        )
        .then(res => {
          commit('deleteTodo', payload.listIndex)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {}
})
