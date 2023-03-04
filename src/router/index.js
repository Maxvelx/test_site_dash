import { createRouter, createWebHistory } from 'vue-router'
import getCookie from "@/js/cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/app/login/Login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('../views/app/home/Index.vue')
    },

      //Posts

    {
      path: '/posts',
      name: 'posts.index',
      component: () => import('../views/app/Posts/post/IndexComponent.vue')
    },
    {
      path: '/post/create',
      name: 'post.create',
      component: () => import('../views/app/Posts/post/CreateComponent.vue')
    },
    {
      path: '/post/edit/:id',
      name: 'post.edit',
      component: () => import('../views/app/Posts/post/EditComponent.vue'),
    },
    {
      path: '/post_category',
      name: 'post_category',
      component: () => import('../views/app/Posts/post_category/IndexComponent.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {top: 0}
  },
})

router.beforeEach((to, from, next) => {
  const TokenAccess = getCookie('x-auth-token')

  if(!TokenAccess) {
    if (to.name !== 'login') {
      return next({name: 'login'})
    }
  }

  if (to.name === 'login') {
    if (TokenAccess){
      return next({name: 'index'})
    }
  }

  next()
})

export default router
