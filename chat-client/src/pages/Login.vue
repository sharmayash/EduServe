<template>
	<q-page>
		<form @submit.prevent="login" class="q-pa-md">
			<div class="row justify-center q-ma-md">
				<div class="col-auto">
					<q-input filled v-model="email" label="Email" color="teal" />
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
	</q-page>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "Login",

	computed: {
		...mapGetters("auth", ["GET_userId"])
	},

	methods: {
		async login() {
			try {
				this.submitting = true
				let res = await this.$store.dispatch("auth/LOGIN", {
					email: this.email,
					password: this.password
				})
				this.$q.notify({
					message: `Welcome ${res.username}`,
					color: "purple"
				})
				this.$router.push("join")
			} catch (error) {
        console.log(error);
      }
			this.submitting = false
		}
	},

	data() {
		return {
			email: "test@post.cmm",
			password: "1234",
			submitting: false
		}
	}
}
</script>
