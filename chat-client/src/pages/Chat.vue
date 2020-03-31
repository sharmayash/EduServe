<template>
	<q-page>
		<div class="row justify-center">
			<div style="width: 100%; max-width: 400px" v-if="messages.length > 0">
				<chat-message
					v-for="message in messages"
					:key="message._id"
					v-bind="message"
				/>
			</div>
			<h4 v-else>No chats</h4>
		</div>
		<!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
	</q-page>
</template>

<script>
import ChatMessage from "components/ChatMessage"
import { mapGetters } from "vuex"

export default {
	name: "PageIndex",

	components: {
		ChatMessage
	},

	computed: {
		...mapGetters("chat", ["messages"])
	},

	data() {
		return {}
	},

	mounted() {
		// WHEN A USER LEAVES THE CHAT
		this.$socket.on("userLeft", data => {
			this.$q.notify({
				message: `${data.username} left the chat`,
				type: "info"
			})
		})

		// WHEN NEW MESSAGE IS RECEIVED
		this.$socket.on("newMsg", data => {
			this.$store.dispatch("chat/SET_NEW_MSG", data)
		})

		// THIS WILL HANDLE ALL NOTIFICATION SENT FROM CHAT SERVER
		this.$socket.on("notification", data => {
			this.$q.notify({
				message: data.message,
				type: data.type
			})
		})
	}
}
</script>
