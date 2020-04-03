<template>
	<q-page>
		<div v-if="isSocketConnected">
			<form @submit.prevent="login" class="q-pa-md">
				<div class="row justify-center q-ma-md">
					<div class="col-auto">
						<q-input
							filled
							v-model="credentials"
							label="Username or Email"
							color="teal"
						/>
					</div>
				</div>
				<div class="row justify-center q-ma-md">
					<div class="col-auto">
						<q-input
							filled
							v-model="password"
							label="Password"
							type="password"
							color="teal"
						/>
					</div>
				</div>
				<div class="row justify-center">
					<q-btn
						type="submit"
						:loading="submitting"
						label="Login"
						class="q-mt-md"
						color="teal"
					>
						<template v-slot:loading>
							<q-spinner-facebook />
						</template>
					</q-btn>
				</div>
			</form>
		</div>
		<center v-else class="q-ma-md">
			<q-spinner-puff color="primary" size="4em" />
			<p>Connecting to socket</p>
		</center>
	</q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "Login",

	computed: {
		...mapGetters("auth", ["GET_userId"])
	},

	mounted() {
		this.connChecker
	},

	methods: {
		stopConnChecker() {
			clearInterval(this.connChecker)
			this.isSocketConnected = true
		},
		async login() {
			try {
				this.submitting = true
				let res = await this.$store.dispatch("auth/LOGIN", {
					credentials: this.credentials,
					password: this.password
				})
				this.$q.notify({
					message: `Welcome ${res.username}`,
					color: "purple"
				})
				this.$router.push("join")
			} catch (error) {
				console.log(error)
			}
			this.submitting = false
		}
	},

	data() {
		return {
			credentials: "postman",
			password: "1234",
			submitting: false,
			isSocketConnected: false,
			connChecker: setInterval(() => {
				if (this.$socket.connected) this.stopConnChecker()
				this.$socket.connect()
			}, 1200)
		}
	}
}
</script>
