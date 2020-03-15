import Vue from 'vue';
import socketIOClient from 'socket.io-client'

const socket = socketIOClient('http://localhost:4000')

Vue.prototype.$socket = socket    // this.$socket

export default socket