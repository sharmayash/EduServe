<template>
	<q-item clickable v-ripple :active="isActive">
		<q-item-section avatar>
			<q-icon name="signal_wifi_off" />
		</q-item-section>
		<q-item-section>{{ this.name }}</q-item-section>
		<q-item-section side>Side</q-item-section>
	</q-item>
</template>

<script>
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
	}
}
</script>
