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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/chat',
        component: () => import('pages/Index.vue'),
        beforeEnter: routeGuard
      },
      {
        path: '/login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '/join',
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
