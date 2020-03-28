import Vue from 'vue'

export const MUTATE_PUSH_MSG = (state, payload) => {
  state.messages.push(payload)
}

export const MUTATE_SET_MSG = (state, payload) => {
  state.messages = payload
}

export const MUTATE_ROOM_NAME = (state, payload) => {
  state.room_name = payload.room_name
}
