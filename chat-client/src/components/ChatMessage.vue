<template>
	<div>
		<q-chat-message
			:name="sender.username"
			:text="[text]"
			:stamp="formattedTimestamp"
			:sent="sender.username === GET_username"
			:bg-color="sender.username === GET_username ? 'teal-1' : 'primary'"
			:text-color="sender.username === GET_username ? 'black' : 'white'"
		/>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import {date} from 'quasar'

export default {
	name: "ChatMessage",
	computed: {
		...mapGetters("auth", ["GET_username"]),
    formattedTimestamp() {
      return date.formatDate(this.timestamp, '⏲ HH:mm:ss 📆 DD-MM-YYYY')
    }
	},
	props: {
		text: {
			type: String,
			required: true
		},
		timestamp: {
			type: String,
			required: true
		},
		sender: {
			type: Object,
			required: true
		},
		_id: {
			type: String,
			required: true
		}
		// avatar: {
		// 	type: String,
		// 	required: true
		// }
	}
}
</script>
