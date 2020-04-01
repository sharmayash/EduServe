import Store from "../store"
import { Notify } from "quasar"

const store = Store()

const routeGuard = async (to, from, next) => {
	const isLoggedIn = await store.dispatch("auth/LOAD_USER")
	if (!isLoggedIn) {
		Notify.create({
			message: "Session Expired",
			type: "warning"
		})
		next("/login")
	}
	next()
}

const routes = [
	{
		path: "/",
		name: "index",
		beforeEnter: (to, from, next) => {
			next("/join")
		}
	},
	{
		path: "/app",
		component: () => import("layouts/MainLayout.vue"),
		children: [
			{
				path: "/chat",
				name: "chat",
				component: () => import("pages/Chat.vue"),
				// beforeEnter: (to, from, next) => {
				// 	store.getters["auth/GET_username"] ? next() : next("/join")
				// }
			},
			{
				path: "/login",
				name: "login",
				component: () => import("pages/Login.vue")
			},
			{
				path: "/join",
				name: "join",
				component: () => import("pages/Join.vue"),
				beforeEnter: routeGuard
			}
		]
	}
]

// Always leave this as last one
if (process.env.MODE !== "ssr") {
	routes.push({
		path: "*",
		component: () => import("pages/Error404.vue")
	})
}

export default routes
