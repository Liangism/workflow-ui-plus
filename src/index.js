import { WorkflowUi, Node } from './components/WorkflowUi'
import './assets/style.css'

const components = [
    WorkflowUi,
    Node
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.vue)
}

export default {
    WorkflowUi,
    Node,
    install
}