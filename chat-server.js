const Room = require('./models/Room')
const Chat = require('./models/Chat')
const User = require('./models/User')

module.exports = {
  init(io) {
    io.on('connection', socket => {
      console.log('New web socket connection!');

      // WHEN THIS SOCKET CONNECTS
      socket.emit('notification', {
        message: 'Welcome',
        type: 'info'
      })

      // WHEN OTHER SOCKET CONNECTS
      socket.broadcast.emit('notification', {
        message: 'User Joined!',
        type: 'info'
      })

      // WHEN SOCKET LEAVES
      socket.on('disconnect', () => {
        socket.broadcast.emit('notification', {
          message: 'User left the User',
          type: "info"
        })
      })

      // WHEN USER WANTS TO JOIN
      socket.on('join', async (data, callback) => {
        // 1. CHECK IF THE ROOM EXISTS
        // 2. CHECK THE MEMBERS
        try {
          const room = await Room.findOne({
            name: data.room_name,
            members: { $all: [data.user_id] }
          })
            .populate({
              path: 'chats',
              model: Chat,
              select: "-updatedAt -__v",
              options: { sort: { 'createdAt': 1 }, limit: 10 },
              populate: {
                path: 'sender', model: User, select: 'username -_id'
              }
            })
            .select('chats -_id')

          if (!room) {
            callback('No such room or access denied')
          }
          else {
            callback(null, room.chats)
          }
        }
        catch (err) {
          console.log(err)
        }
      })

      // WHEN USER SENDS CHAT MESSAGE
      socket.on('sendMsg', async (data, callback) => {
        // 1. CREATE CHAT IN DB
        // 2. BROADCAST EVENT TO EVERY OTHER SOCKET
        const chat = Chat({
          sender: data.user_id,
          text: data.text
        })
      })
    })
  }
}