// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
//require('es5-shim');
//import 'babel-polyfill';
//if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
//if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;
import App from './App'
import router from './router'
import store from './vuex/store.js'


Vue.config.productionTip = false

import { Message,Button,Checkbox,Dialog} from 'element-ui';

Vue.prototype.$message = Message;

Vue.use(Button)
Vue.use(Dialog);
Vue.use(Checkbox);





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

