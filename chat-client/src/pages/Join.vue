<template>
	<q-page>
		<div class="q-pa-md">
			<div class="row justify-center">
				<q-option-group
					v-model="panel"
					inline
					:options="[
						{ label: 'Join', value: 'join' },
						{ label: 'Create', value: 'create' }
					]"
				/>
			</div>

			<q-tab-panels
				v-model="panel"
				animated
				transition-prev="scale"
				transition-next="scale"
			>
				<q-tab-panel name="join">
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
							@click="join"
						>
							<template v-slot:loading>
								<q-spinner-facebook />
							</template>
						</q-btn>
					</div>
				</q-tab-panel>

				<q-tab-panel name="create">
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
							label="Create"
							class="q-mt-md"
							color="green"
							@click="create"
						>
							<template v-slot:loading>
								<q-spinner-facebook />
							</template>
						</q-btn>
					</div>
				</q-tab-panel>
			</q-tab-panels>
		</div>
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
		join() {
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
						console.log(data)
						this.$store.dispatch("chat/INIT_MSGS", data)
						this.$router.push({
							path: "/chat",
							query: { name: this.room_name }
						})
					}
				}
			)
		},
		create() {}
	},

	data() {
		return {
			room_name: "",
			submitting: false,
			panel: "join"
		}
	}
}
</script>
