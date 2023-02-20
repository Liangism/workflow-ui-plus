import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import Node from './components/WorkflowUi/node'

Vue.component('Node', Node)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
