<template>
  <div>
    <textarea class="form-control" v-text="$options._content.innerHTML"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'TextAreaField',

    props: ['']
  }
</script>

<style scoped>

</style>
