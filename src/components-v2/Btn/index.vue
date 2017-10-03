<template>
  <button :type="type" :class="className" :size="size" @click="handleClick($event)" :value="value">
    <slot>Submit</slot>
  </button>
</template>

<script>
  export default {
    name: 'Btn',

    props: {
      type: {
        type: String,
        default: 'button',
        validator(value) {
          return value === 'button' || value === 'submit' || value === 'reset';
        }
      },
      action: {
        type: String,
        default: 'default',
        validator(value) {
          return value === 'default'
            || value === 'primary'
            || value === 'secondary'
            || value === 'info'
            || value === 'danger';
        }
      },
      size: {
        type: String,
        default: null,
        validator(value) {
          return value = null || value === 'sm' || value === 'lg'
        }
      },
      value: {
        type: String,
        default: null,
      }
    },

    computed: {
      className() {
        let size

        if (this.size) {
          size = 'btn-' + this.size
        }

        return ['btn', 'btn-' + this.action, size]
      }
    },

    methods: {
      handleClick(evt) {
        this.$emit('click', evt)
      }
    }
  }
</script>

<style scoped>

</style>
