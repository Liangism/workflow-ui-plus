<template>
  <div style="width: 80%;">
    <textarea v-model="value1" class="ant-input-textarea"></textarea>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data() {
    return {
      value1: undefined
    }
  },
  watch: {
    value(val) {
      this.value1 = val
    },
    value1(val) {
      this.$emit('update:value', val)
    }
  },
  mounted() {}
}
</script>
