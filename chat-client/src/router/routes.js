import Store from '../store';

const store = Store()

const routeGuard = async (to, from, next) => {
  const isLoggedIn = await store.dispatch("auth/LOAD_USER")
  if (!isLoggedIn) {
    store.dispatch("chat/SET_NOTIFICATION", {
      message: "Session expired",
      type: "info"
    })
    next('/login')
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'index',
    beforeEnter: (to, from, next) => {
      next('/join')
    }
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/chat',
        name: 'chat',
        component: () => import('pages/Chat.vue'),
        // beforeEnter: routeGuard
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/join',
        name: 'join',
        component: () => import('pages/Join.vue'),
        beforeEnter: routeGuard
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
