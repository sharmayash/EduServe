export const messages = state => {
  return state.messages
}

export const showNotification = state => {
  return state.notification.show
}

export const getNotification = state => {
  return {
    message: state.notification.message,
    type: state.notification.type
  }
}