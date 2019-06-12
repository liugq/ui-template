/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import App from './App.vue'
import router from '../../router'
import store from '../../store'
import axios from 'axios'
import qs from 'qs'
import schema from 'async-validator'

/* import './registerServiceWorker' */
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn,
  /* Icon, */
  Input,
  Form,
  FormItem,
  Message,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Switch,
  Checkbox,
  Pagination,
  Loading,
  Select,
  Option,
  DatePicker,
  TimeSelect,
  TimePicker,
  Tree
} from 'element-ui'

Vue.prototype.$ELEMENT = {
  size: 'small',
  zIndex: 3000
}

Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
// Vue.use(Icon)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Tree)

// Vue.use(Message)

// 引入mockjs
process.env.NODE_ENV != 'production' ? require('../../mock.js') : ''

var http = axios.create({
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  validateStatus: function (status) {
    return status >= 200 && status < 300 // 默认的
  }
})
http.defaults.timeout = 3000 // 3秒
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  let msg = ''
  // let msg=error.message+"<br/>["+error.response.statusText+"(状态码："+error.response.status+")]"
  // console.log(JSON.stringify(error))
  /* let msg="错误信息: "+error.response.statusText+" (状态码："+error.response.status+") "
                                                                                                                                                                                                                                                                                                                                            +"<br/>访问页面: "+error.request.responseURL */
  if (error.response.status == 401) {
    window.location = '/'
  }
  if (error.response.data & error.response.data.message) {
    let _data = error.response.data
    msg = '错误信息: ' + _data.message + '  ' + _data.error +
            '<br/>状态码：' + _data.status +
            '<br/>访问页面: ' + _data.path +
            '<br/>访问时间: ' + _data.timestamp
  } else {
    msg = '错误信息: ' + error.response.statusText +
            '<br/>状态码：' + error.response.status +
            '<br/>访问页面: ' + error.request.responseURL
  }
  _vue.$message({
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: msg,
    type: 'error'
  })
  return Promise.reject(error)
})

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.prototype.$schema = schema
Vue.prototype.$qs = qs

let _vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
