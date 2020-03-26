const mongoose = require("mongoose")

const Room = require('./models/Room')
const Chat = require('./models/Chat')
const User = require('./models/User')

module.exports = {
  init(io) {

    io.on('connection', socket => {
      console.log('New web socket connection!');

      // // WHEN THIS SOCKET CONNECTS
      // socket.emit('notification', {
      //   message: 'Welcome',
      //   type: 'info'
      // })

      // // WHEN OTHER SOCKET CONNECTS
      // socket.broadcast.emit('notification', {
      //   message: 'User Joined!',
      //   type: 'info'
      // })

      // WHEN SOCKET LEAVES
      socket.on('disconnect', () => {
        socket.broadcast.emit('notification', {
          message: 'User left',
          type: "info"
        })
      })

      // WHEN USER WANTS TO JOIN
      socket.on('join', async (data, callback) => {
        // 1. CHECK IF THE ROOM EXISTS
        // 2. CHECK THE TYPE PUBLIC | PRIVATE
        try {
          const room = await Room.findOne({
            name: data.room_name
          }).populate({
            path: 'chats',
            model: Chat,
            select: "-updatedAt -__v",
            options: { sort: { 'createdAt': 1 }, limit: 10 },
            populate: {
              path: 'sender', model: User, select: 'username -_id'
            }
          })
            .select('chats members is_private -_id')

          if (!room) {
            callback('No such room or access denied')
          }

          if (room.is_private) {
            const isMember = room.findOne({
              members: { $all: [data.user_id] }
            })

            if (!isMember) callback('Private room')
          }

          socket.join(room.name, (err) => {
            if (err) callback(err)
          })

          // io.to(room.name).emit('notification', {
          //   message: 'Welcome',
          //   type: 'info'
          // })

          socket.broadcast.to(room.name).emit('notification', {
            message: `${data.username} Joined!`,
            type: 'info'
          })

          callback(null, room.chats)
        }
        catch (err) {
          console.log(err)
        }
      })

      // WHEN USER WANTS TO CREATE A ROOM
      socket.on('create', async (data, callback) => {
        const { is_private, room_name, user_id } = data
        const room = new Room({
          is_private,
          name: room_name,
          members: [mongoose.Types.ObjectId(user_id)]
        })
        room.save()
        socket.join('' + room_name, err => {
          if (err) callback(err)
          callback(null)
        })
      })

      // WHEN USER SENDS CHAT MESSAGE
      socket.on('sendMsg', async (data, callback) => {
        // 1. CREATE CHAT IN DB
        // 2. CREATE REF IN ROOM
        // 3. BROADCAST EVENT TO EVERY OTHER SOCKET
        try {
          const chat = await Chat({
            sender: data.userId,
            text: data.text,
            timestamp: data.timestamp
          }).save()

          await Room.findOneAndUpdate({
            name: data.room_name,
            $push: {
              chats: chat._id
            }
          })

          socket.to(data.room_name).broadcast.emit('newMsg', {
            text: data.text,
            timestamp: data.timestamp,
            sender: data.user_id,
            _id: timestamp
          })

          callback()
        } catch (error) {
          console.log(error);
          callback('DB Error')
        }

      })
    })
  }
}