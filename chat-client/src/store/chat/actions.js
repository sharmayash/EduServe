import socket from 'boot/socket'

export const SEND_MSG = ({ commit, state }, payload) => {
  const { text, userId } = payload

  const timestamp = new Date().toISOString()
  const data = {
    text,
    userId,
    timestamp,
    room_name: state.room_name
  }
  socket.emit('sendMsg', data)
  const obj = {
    text,
    timestamp,
    sender: userId,
    _id: timestamp
  }
  commit('MUTATE_SEND_MSG', obj)
}

export const INIT_MSGS = ({ commit }, payload) => {
  commit("MUTATE_SET_MSG", payload)
}

export const SET_ROOM_NAME = ({ commit }, payload) => {
  commit("MUTATE_ROOM_NAME", payload)
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

export const NEW_MSG = ({ commit }, payload) => {
  commit("MUTATE_SET_MSG", payload)
}
