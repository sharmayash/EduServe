<template>
	<q-item clickable v-ripple :active="isActive" @click="join">
		<q-item-section avatar>
			<q-icon name="signal_wifi_off" />
		</q-item-section>
		<q-item-section>{{ this.name }}</q-item-section>
		<q-item-section side>Side</q-item-section>
	</q-item>
</template>

<script>
import { mapGetters } from "vuex"
export default {
	props: {
		name: {
			type: String,
			required: true
		},
		_id: {
			type: String,
			required: true
		}
	},

	computed: {
		...mapGetters("auth", ["GET_userId", "GET_username"])
	},

	watch: {
		$route(to, from) {
			if (this.$router.history.current.query.name === this.name)
				this.isActive = true
		}
	},

	data() {
		return {
			isActive: false
		}
	},

	methods: {
		join() {
			this.$socket.emit(
				"join",
				{
					room_name: this.name,
					user_id: this.GET_userId,
					username: this.GET_username
				},
				(error, data = null) => {
					if (error) {
						this.submitting = false
						alert(error)
					} else {
						this.submitting = false

						// data is chats from server
						this.$store.dispatch("chat/INIT_MSGS", data)
						this.$store.dispatch("chat/SET_ROOM_NAME", {
							room_name: this.name
						})
						this.$router.push({
							path: "/chat",
							query: { name: this.name }
						})
					}
				}
			)
		}
	}
}
</script>
