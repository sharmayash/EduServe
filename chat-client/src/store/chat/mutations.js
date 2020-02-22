import Vue from 'vue'

export const MUTATE_SEND_MSG = (state, payload) => {
  state.messages.push(payload)
}

export const MUTATE_SET_MSG = (state, payload) => {
  state.messages = payload
}

export const MUTATE_NOTIFICATION = (state, payload) => {
  state.notification = {
    ...state.notification,
    ...payload
  }
}