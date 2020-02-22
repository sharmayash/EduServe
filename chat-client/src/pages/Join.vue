<template>
	<q-page>
		<form @submit.prevent="simulateSubmit" class="q-pa-md">
			<div class="row justify-center">
				<div class="col-3">
					<q-input
						filled
						v-model="room_name"
						label="Room Name"
						hint="Enter the room to join"
						color="teal"
					/>
				</div>
			</div>
			<div class="row justify-center">
				<q-btn
					type="submit"
					:loading="submitting"
					label="Join"
					class="q-mt-md"
					color="teal"
				>
					<template v-slot:loading>
						<q-spinner-facebook />
					</template>
				</q-btn>
			</div>
		</form>
	</q-page>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"

export default {
	name: "Join",

	computed: {
		...mapGetters("auth", ["GET_userId"])
	},

	methods: {
		simulateSubmit() {
			this.submitting = true
			this.$socket.emit(
				"join",
				{
					room_name: this.room_name,
					user_id: this.GET_userId
				},
				(error, data = null) => {
					if (error) {
						this.submitting = false
						alert(error)
					} else {
						this.submitting = false

						// data is chats from server
						console.log(data);
						this.$store.dispatch("chat/INIT_MSGS", data)
						this.$router.push({
							path: "/chat",
							query: { name: this.room_name }
						})
					}
				}
			)
		}
	},

	data() {
		return {
			room_name: "",
			submitting: false
		}
	}
}
</script>
