import Vue from 'vue';
import Router from 'vue-router';
// 导入组件，所有的import 都应该在文件最上面
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';

// @ 代表的是src的绝对路径
// @ 是在build/webpack.base.conf.js

// 为什么可以省略.vue  在build/webpack.base.conf.js 中配置了
// 模块省略后缀之后，加载的顺序  extensions: ['.js', '.vue', '.json'],
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);


const router = new Router({
  routes: [
    { name: 'Login', path: '/login', component: Login },
    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles }
      ]
    }
  ]
});

// 路由的全局前置守卫 （拦截器）  -- 路由跳转之前执行
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});

export default router;
