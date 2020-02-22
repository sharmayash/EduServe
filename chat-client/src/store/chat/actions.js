import socket from 'boot/socket'

export const SEND_MSG = ({ commit, state }, payload) => {
  const timestamp = new Date().toISOString
  const data = {
    text: payload.text,
    user_id: state.user_id,
    timestamp
  }
  socket.emit('sendMsg', data)
  const obj = {
    text: payload,
    timestamp,
    user: "me",
    id: timestamp
  }
  commit('MUTATE_SEND_MSG', obj)
}

export const INIT_MSGS = ({commit}, payload) => {
  commit("MUTATE_SET_MSG", payload)
}

export const SET_NOTIFICATION = ({ commit }, payload) => {
  const obj = {
    show: true,
    message: payload.message,
    type: payload.type
  }
  commit('MUTATE_NOTIFICATION', obj)

  setTimeout(() => {
    commit('MUTATE_NOTIFICATION', { show: false })
  }, 5000)
}
