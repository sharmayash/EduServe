import Store from '../store';

const store = Store()

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/chat', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      {
        path: '/',
        component: () => import('pages/Join.vue'),
        beforeEnter: async (to, from, next) => {
          const res = await store.dispatch("auth/LOAD_USER")
          if (res === null) {
            store.dispatch("chat/SET_NOTIFICATION", {
              message: "Session expired",
              type: "info"
            })
            next('/login')
          }
        }
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
