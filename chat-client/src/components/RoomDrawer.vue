<template>
	<q-drawer v-model="open" bordered v-if="GET_isAuthenticated && GET_username">
		<center v-if="isLoading">
			<q-spinner-cube color="primary" size="3em" />
		</center>

		<q-list v-else-if="this.rooms.length > 0">
			<q-item-label header class="text-grey-8">Rooms</q-item-label>
			<room-item
				v-for="(room, index) in rooms"
				:key="room + index"
				v-bind="room"
			/>
		</q-list>

		<center v-else>
			<p>No Rooms Joined</p>
		</center>
	</q-drawer>
</template>

<script>
import RoomItem from "./RoomItem"
import { mapGetters } from "vuex"
import axios from "axios"
import { GET_userId } from "../store/auth/getters"

export default {
	props: {
		open: Boolean
	},

	computed: {
		...mapGetters("auth", ["GET_username", "GET_isAuthenticated", "GET_userId"])
	},

	mounted() {
		const requestBody = {
			query: `
        query{
          rooms(user_id:"${this.GET_userId}"){
            name
            _id
          }
        }
      `
		}

		this.isLoading = true

		axios
			.post("/graphql", requestBody)
			.then(res => {
				this.rooms = res.data.data.rooms
				this.isLoading = false
			})
			.catch(e => {
				console.log(e)
      })
      
		this.isLoading = false
	},

	data() {
		return {
			rooms: [],
			isLoading: false
		}
	},

	components: {
		RoomItem
	}
}
</script>
