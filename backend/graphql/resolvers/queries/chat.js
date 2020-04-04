const User = require("../../../models/User")
const Room = require("../../../models/Room")

module.exports = {
	async rooms(parent, { user_id }, { req }) {
		try {
			const user = await User.findById(user_id).populate({
				path: "rooms",
				model: Room,
				select: "name _id"
			})

      return user.rooms
      
		} catch (e) {
			console.log(e)
			return e
		}
	}
}
