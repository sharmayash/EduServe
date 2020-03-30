<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar class="bg-grey-1 text-black">
				<q-btn
					flat
					dense
					round
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
					color="teal"
					:icon="!isDarkMode ? 'fas fa-moon' : 'fas fa-sun'"
					@click="toggleTheme"
				/>

				<q-btn
					v-if="GET_isAuthenticated"
					flat
					round
					dense
					icon="logout"
					@click="logout"
				/>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
			<q-list>
				<q-item-label header class="text-grey-8">Essential Links</q-item-label>
				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>

		<q-footer elevated v-show="showFooter">
			<q-toolbar class="bg-grey-1">
				<q-space />
				<q-toolbar-title class="q-ml-lg">
					<q-input
						standout="bg-teal-1"
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
import EssentialLink from "components/EssentialLink"

import { mapActions, mapGetters } from "vuex"
import { GET_username } from '../store/auth/getters'

export default {
	name: "MainLayout",

	beforeUpdate() {
		this.showFooter = window.location.hash.includes("#/chat")
	},

	components: {
		EssentialLink
	},

	computed: {
		...mapGetters("auth", ["GET_isAuthenticated", "GET_userId", "GET_username"]),
		...mapGetters("chat", ["GET_room_name"]),
		isDarkMode() {
			return this.$q.dark.isActive
		}
	},

	data() {
		return {
			text: "",
			leftDrawerOpen: false,
			showFooter: false,
			essentialLinks: [
				// {
				//   title: 'Facebook',
				//   caption: '@QuasarFramework',
				//   icon: 'public',
				//   link: 'https://facebook.quasar.dev'
				// }
			]
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
		},
		logout() {
			this.$store.dispatch("auth/LOGOUT")
			this.$q.notify({
				message: "Logged Out",
				type: "warning"
			})
			this.$router.push("/login")
		},
		toggleTheme() {
			this.$q.dark.toggle()
		}
	}
}
</script>
