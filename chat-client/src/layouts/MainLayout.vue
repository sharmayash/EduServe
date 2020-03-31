<template>
	<q-layout view="lHh Lpr lFf">
		<Header :leftDrawerOpen="leftDrawerOpen" />

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer elevated v-show="showFooter">
			<q-toolbar>
				<q-space />
				<q-toolbar-title class="q-ml-lg">
					<q-input
						standout=""
						filled
						v-model="text"
						label="Type your message here"
					/>
				</q-toolbar-title>
				<q-space />
				<q-btn
					flat
					round
					class="bg-teal"
					icon="send"
					@click="sendMsg({ text, user_id: GET_userId })"
				/>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
import Header from "components/Header"

import { mapActions, mapGetters } from "vuex"

export default {
	name: "MainLayout",

	beforeUpdate() {
		this.showFooter = window.location.hash.includes("#/chat")
	},

	components: {
		Header
	},

	computed: {
		...mapGetters("auth", ["GET_userId", "GET_username"]),
		...mapGetters("chat", ["GET_room_name"]),
		isDarkMode() {
			return this.$q.dark.isActive
		}
	},

	data() {
		return {
			text: "",
			showFooter: false
		}
	},

	methods: {
		sendMsg(payload) {
			const { text, user_id } = payload
			const timestamp = new Date().toISOString()
			const data = {
				text,
				user_id,
				timestamp,
				room_name: this.GET_room_name,
				username: this.GET_username
			}
			this.$socket.emit("sendMsg", data)
		}
	}
}
</script>
