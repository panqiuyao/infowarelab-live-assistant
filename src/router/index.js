
import chat from '@/components/chat'
import user from '@/components/user'

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'chat',
       meta:{index:0},
      component: chat
    },
    {
      path: '/chat',
      name: 'chat',
      meta:{index:0},
      component: chat
    },
    {
      path: '/user',
      name: 'user',
      meta:{index:1},
      component: user,
    }
  ]
})
