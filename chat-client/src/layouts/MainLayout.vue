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
					Convo (EduServe)
				</q-toolbar-title>

				<div>Quasar v{{ $q.version }}</div>
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

		<notification
			:message="getNotification.message"
			:type="getNotification.type"
		/>

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
					@click="SEND_MSG(text)"
				/>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink"
import Notification from "components/Notification"

import { mapActions, mapGetters } from "vuex"

export default {
	name: "MainLayout",

	beforeUpdate() {
		if (window.location.pathname === "/") this.showFooter = false
		else this.showFooter = true
	},

	components: {
		EssentialLink,
		Notification
	},

	computed: {
		...mapGetters("chat", ["getNotification"])
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
		...mapActions("chat", ["SEND_MSG"])
	}
}
</script>
