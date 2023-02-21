<template>
  <div>
    <div class='fd-nav'>
      <div class='fd-nav-left'>
        <div class='fd-nav-back' @click='back'>
          <i aria-label='icon: left' class='anticon anticon-left'>
            <svg
              viewBox='64 64 896 896'
              focusable='false'
              class=''
              data-icon='left'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                d='M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z'
              />
            </svg>
          </i>
        </div>
        <div class='fd-nav-title'>
          {{ data1.title }}
        </div>
      </div>
      <div class='fd-nav-center'>
        <div class='fd-nav-container' v-show='!editFlowName'>
          <div class='fd-nav-item'>
            {{ flowName1 }}
          </div>
          <i
            aria-label='icon: edit'
            tabindex='-1'
            class='anticon anticon-edit'
            @click='toggleEditFlowName'
            title='点击修改'
            v-if='IsPreviewModel'
          >
            <svg
              viewBox='64 64 896 896'
              focusable='false'
              class=''
              data-icon='edit'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                d='M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'
              />
            </svg>
          </i>
        </div>
        <div class='flow-name' v-show='editFlowName'>
          <input
            v-model='flowName1'
            ref='flowNameInput'
            class='flow-name-input'
            placeholder='请输入流程名称'
            @blur='flowNameInputBlur'
          />
        </div>
      </div>
      <div class='fd-nav-right'>
        <button
          type='button'
          class='ant-btn button-preview'
          @click='preview'
          v-show='IsPreviewModel'
        >
          <span>预 览</span>
        </button>
        <button
          type='button'
          class='ant-btn button-preview'
          @click='save'
          v-show='IsPreviewModel'
        >
          <span>发 布</span>
        </button>
      </div>
    </div>
    <div class='fd-nav-content'>
      <div class='dingflow-design'>
        <div class='zoom'>
          <div class='zoom-out' @click='zoom(-10)' />
          <span>{{ zoomValue || 100 }}%</span>
          <div class='zoom-in' @click='zoom(10)' />
        </div>
        <div ref='scale' class='ie-polyfill-container' style='overflow: hidden'>
          <div
            id='box-scale'
            :key='key'
            class='box-scale'
            :style='
              `transform: ${
                zoomStyle.transform
              }; transform-origin: 50% 0px 0px;`
            '
            v-drag
          >
            <Node
              v-for='(item, index) in items'
              :key='index'
              :node='item'
              @addnode='addnode'
              @delNode='delNode(item)'
            />
            <EndNode />
            <AModal :dialog.sync='viewModal' append-to-body>
              <i class='anticon anticon-copy' title='复制' @click='copyData'>
                <svg
                  t='1675939759178'
                  class='icon'
                  viewBox='0 0 1024 1024'
                  xmlns='http://www.w3.org/2000/svg'
                  p-id='4386'
                  width='1em'
                  height='1em'
                >
                  <path
                    d='M706.5 188.4H190.2c-29.8 0-54 24.2-54 54v662.9c0 29.8 24.2 54 54 54h516.3c29.8 0 54-24.2 54-54V242.4c0-29.8-24.2-54-54-54z m-18 698.9H208.2V260.4h480.3v626.9z'
                    p-id='4387'
                    fill='#bfbfbf'
                  ></path>
                  <path
                    d='M313.7 512.2h275.2c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36zM313.7 715.2h201.6c19.9 0 36-16.1 36-36s-16.1-36-36-36H313.7c-19.9 0-36 16.1-36 36s16.1 36 36 36z'
                    p-id='4388'
                    fill='#bfbfbf'
                  ></path>
                  <path
                    d='M837.2 64.7H302.9c-19.9 0-36 16.1-36 36s16.1 36 36 36h516.3v662.9c0 19.9 16.1 36 36 36s36-16.1 36-36V118.7c0-29.8-24.2-54-54-54z'
                    p-id='4389'
                    fill='#bfbfbf'
                  ></path>
                </svg>
              </i>
              <pre
                style='
                  font-family: Monaco, Menlo, Consolas, Bitstream Vera Sans Mono,
                    monospace;
                  font-size: 14px;
                '
              >
                {{ dataStr }}
              </pre>
            </AModal>
            <ErrorsModal :dialog.sync='errorsModal' :data='errors' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AModal from './../AModal/AModal'
import EndNode from './end-node'
import ErrorsModal from './errors-modal'
import { iteratorData, addNewNode, delNode, checkData } from './process'

export default {
  name: 'Workflow',
  directives: {
    drag: {
      //鼠标拖拽插件-自定义指令方式
      // 指令的定义
      inserted(el) {
        // el.drag();
        // console.log(el)
        //获取元素
        // var dv = document.getElementById("dv");
        let x = 0
        let y = 0
        let l = 0
        let t = 0
        let isDown = false
        //鼠标按下事件
        el.onmousedown = function(e) {
          //获取x坐标和y坐标
          x = e.clientX
          y = e.clientY

          //获取左部和顶部的偏移量
          l = el.offsetLeft
          t = el.offsetTop
          //开关打开
          isDown = true
          //设置样式
          el.style.cursor = 'move'
        }
        //鼠标移动
        window.onmousemove = function(e) {
          if (!isDown) return
          //获取x和y
          let nx = e.clientX
          let ny = e.clientY
          //计算移动后的左偏移量和顶部的偏移量
          let nl = nx - (x - l)
          let nt = ny - (y - t)

          el.style.left = nl + 'px'
          el.style.top = nt + 'px'
        }
        //鼠标抬起事件
        el.onmouseup = function() {
          //开关关闭
          isDown = false
          el.style.cursor = 'default'
        }
      }
    }
  },
  components: {
    EndNode,
    AModal,
    ErrorsModal
  },
  props: {
    flowName: {
      type: String,
      default: '流程设计'
    },
    data: {
      type: Object,
      default: undefined
    }
  },
  data: () => ({
    items: [],
    key: 0,
    errorsModal: false,
    errors: [],
    viewModal: false,
    zoomValue: 100,
    zoomStyle: {
      transform: 1
    },
    IsPreviewModel: false, //预览模式
    flowName1: '',
    editFlowName: false,
    data1: {
      title: '返回',
      childNode: {
        name: '发起人',
        type: 'start',
        nodeId: 'sid-startevent',
        childNode: {}
      }
    }
  }),
  computed: {
    dataStr() {
      return JSON.stringify(this.data1.childNode, null, 4)
    }
  },
  watch: {
    flowName: {
      handler(val) {
        this.flowName1 = val
      },
      immediate: true
    },
    data: {
      handler(val) {
        this.data1 = val
      },
      deep: true
    }
  },
  mounted() {
    if (this.data && this.data.childNode) {
      this.data1 = this.data
    }
    if (!this.data1.childNode) {
      this.initialNode()
    }
    this.iteratorData(this.data1.childNode)
    const boxScale = this.$refs.scale
    boxScale.addEventListener('wheel', this.wheelHandle, { passive: false })
  },
  methods: {
    //清空节点
    clearItems() {
      //显示按钮
      this.IsPreviewModel = true
      this.data1.childNode = {
        name: '发起人',
        type: 'start',
        nodeId: 'sid-startevent'
      }
      this.iteratorData(this.data1.childNode)
    },
    //新增
    addModel() {
      this.clearItems()
      this.editFlowName = true
    },
    //预览模式
    previewModel(data) {
      //隐藏按钮
      this.IsPreviewModel = false
      this.editFlowName = false
      this.iteratorData(data)
    },
    //编辑模式
    editModel(data) {
      //显示按钮
      this.IsPreviewModel = true
      this.editFlowName = false
      this.iteratorData(data)
    },
    initialNode() {
      this.data1.childNode = {
        name: '发起人',
        type: 'start',
        nodeId: 'sid-startevent'
      }
    },
    iteratorData(data) {
      this.items = []
      iteratorData(this.items, data)
    },
    addnode(node) {
      // console.log('添加节点:' + node.nodeId)
      addNewNode(node, this.data1.childNode, this.items)
      this.key++
    },
    delNode(node) {
      // console.log('删除节点:' + node.properties.actionerRules[0].labelNames)
      delNode(node, this.data1.childNode, this.items)
      this.key++
    },
    save() {
      const errors = checkData(this.data1.childNode)
      if (errors.length > 0) {
        this.errorsModal = true
        this.errors = errors
        return
      }
      this.$emit('update:flowName', this.flowName1)
      this.$emit('ok', this.data1)
      console.log(this.data1)
    },
    preview() {
      const errors = checkData(this.data1.childNode)
      if (errors.length > 0) {
        this.errorsModal = true
        this.errors = errors
        return
      }
      this.viewModal = true
    },
    // 缩放
    zoom(v) {
      let zv = (this.zoomValue || 100) + v
      if (zv < 20) zv = 20
      else if (zv > 200) zv = 200
      this.zoomValue = zv
      this.zoomStyle = { transform: `scale(${zv / 100})` }
    },
    resetZoom() {
      const boxScale = document.getElementById('box-scale')
      boxScale.setAttribute('style', `transform-origin: 50% 0px 0px;`)
      this.zoomValue = 100
    },
    back() {
      this.resetZoom()
      this.$emit('back')
    },
    wheelHandle(e) {
      if (e.preventDefault) {
        e.preventDefault()
      }
      const down = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0
      this.zoom(down ? -5 : 5)
    },
    copyData() {
      const input = document.createElement('input')
      input.value = this.dataStr
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
      this.toast('复制成功！')
    },
    toast(text) {
      if (document.getElementById('toast')) return
      const tipBox = document.createElement('div')
      tipBox.setAttribute('id', 'toast')
      tipBox.setAttribute(
        'style',
        `
        font-size: 14px;
        color: #13ce66;position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e7faf0;
        border: 1px solid #d0f5e0;
        border-radius: 4px;
        transition: opacity 0.3s, transform 0.4s, top 0.4s;
        padding: 10px 15px;
        box-sizing: border-box;`
      )
      const tip = document.createElement('div')
      tip.innerHTML = text
      tipBox.appendChild(tip)
      document.body.appendChild(tipBox)
      setTimeout(() => {
        document.body.removeChild(tipBox)
      }, 1500)
    },
    toggleEditFlowName() {
      this.editFlowName = !this.editFlowName
      if (this.editFlowName) {
        this.$nextTick(() => {
          this.$refs.flowNameInput.focus()
        })
      }
    },
    flowNameInputBlur() {
      if (this.flowName1) {
        this.toggleEditFlowName()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
