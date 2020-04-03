<template>
	<div>
		<q-header elevated>
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					v-if="GET_isAuthenticated && GET_username"
					@click="leftDrawerOpen = !leftDrawerOpen"
					v-bind:icon="leftDrawerOpen ? 'close' : 'menu'"
					aria-label="Menu"
				/>

				<q-toolbar-title>
					Convo
				</q-toolbar-title>

				<q-btn
					flat
					round
					dense
					class="q-ma-md"
					icon="brightness_4"
					@click="toggleTheme"
				/>

				<q-btn
					v-if="GET_isAuthenticated && GET_username"
					flat
					round
					dense
					icon="logout"
					@click="logout"
				/>
			</q-toolbar>
		</q-header>

		<div v-if="GET_isAuthenticated && GET_username">
			<room-drawer :open="leftDrawerOpen" />
		</div>
	</div>
</template>

<script>
import RoomDrawer from "components/RoomDrawer"
import { mapGetters } from "vuex"

export default {
	computed: {
		...mapGetters("auth", ["GET_isAuthenticated", "GET_username"]),
		...mapGetters("chat", ["GET_room_name"])
	},
	data() {
		return {
			leftDrawerOpen: true
		}
	},
	methods: {
		toggleTheme() {
			this.$q.dark.toggle()
		},
		logout() {
			this.$socket.emit("logout", {
				username: this.GET_username,
				room_name: this.GET_room_name
			})
			this.$store.dispatch("auth/LOGOUT")
			this.$store.dispatch("chat/CLEAR_MSGS")
			this.$q.notify({
				message: "Logged Out",
				type: "warning"
			})
			this.$socket.removeAllListeners()
			this.$router.push("/login")
		}
	},
	components: {
		RoomDrawer
	}
}
</script>
