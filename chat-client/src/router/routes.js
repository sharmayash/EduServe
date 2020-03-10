
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/chat', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/', component: () => import('pages/Join.vue') },
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
