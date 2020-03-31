<template>
	<div>
		<q-header elevated>
			<q-toolbar>
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
					class="q-ma-md"
					icon="brightness_4"
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
	</div>
</template>

<script>
import EssentialLink from "components/EssentialLink"
import { mapGetters } from "vuex"

export default {
	computed: {
		...mapGetters("auth", ["GET_isAuthenticated"])
	},
	data() {
		return {
            leftDrawerOpen: false,
            essentialLinks: []
		}
	},
	methods: {
		toggleTheme() {
			this.$q.dark.toggle()
		},
		logout() {
			this.$store.dispatch("auth/LOGOUT")
			this.$q.notify({
				message: "Logged Out",
				type: "warning"
			})
			this.$router.push("/login")
		}
    },
    components:{
        EssentialLink
    }
}
</script>
