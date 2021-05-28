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
    requestBuffer: state => state.requestBuffer,
    todosCount: state => state.todos.length,
    todosCompletedCount: state =>
      state.todos.filter(todo => todo.completed).length,
    todosUncompletedCount: state =>
      state.todos.filter(todo => !todo.completed).length
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
      state.todos.splice(id, 1)
    },
    deleteAllTodos(state, payload) {
      state.todos = payload
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
          const splicedTodos = res.data.splice(0, 5)
          for (const todo of splicedTodos) {
            todo.show = true
            todo.editMode = false
            todo.updateBuffer = false
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
          todo.updateBuffer = false
          commit('addTodo', todo)
          commit('updateRequestBuffer', false)
          return todo
        })
        .catch(err => {
          console.log(err)
        })
    },
    async updateTodo({ commit, dispatch }, payload) {
      if (payload.title.length === 0) {
        payload.show = false
        dispatch('deleteTodo', payload.id)
      }
      return axios
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
    async deleteTodo({ commit }, payload) {
      if (payload === 'deleteAll') {
        return axios
          .delete('https://jsonplaceholder.typicode.com/todos/*')
          .then(res => {
            commit('deleteAllTodos', [])
          })
          .catch(err => {
            console.log(err)
          })
      }
      return axios
        .delete(
          `https://jsonplaceholder.typicode.com/todos/${payload.todoData.id}`
        )
        .then(res => {
          commit('deleteTodo', payload.listIndex)
        })
        .catch(err => {
          payload.todoData.show = true
          console.log(err)
        })
    }
  },
  modules: {}
})
