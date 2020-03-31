// import socket from 'boot/socket'

export const SET_NEW_MSG = ({commit}, payload) => {
  console.log('actions');
  commit("MUTATE_PUSH_MSG", payload)
}

export const INIT_MSGS = ({ commit }, payload) => {
  commit("MUTATE_SET_MSG", payload)
}

export const SET_ROOM_NAME = ({ commit }, payload) => {
  commit("MUTATE_ROOM_NAME", payload)
}

export const NEW_MSG = ({ commit }, payload) => {
  commit("MUTATE_SET_MSG", payload)
}

export const CLEAR_MSGS = ({ commit }) => {
  commit("MUTATE_CLEAR_MSGS")
}
