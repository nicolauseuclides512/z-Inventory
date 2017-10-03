<template>
  <a :href="href"
     :target="target"
     @click="handleClick($event)"
  >
    <slot>{{ href }}</slot>
  </a>
</template>

<script>
  export default {
    name: 'BtnLink',

    props: {
      href: {
        type: String
      },
      target: {
        type: String
      },
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
