<template>
  <div>
    <input class="form-control" :type="type" :placeholder="placeholder" v-slot="j">
  </div>
</template>

<script>
  export default {
    name: 'Textarea',

    props: {
      type: {
        type: String,
        default: 'text',
      },
      j: {
        type: String,
      },
      placeholder: {
        type: String,
      }
    }
  }
</script>

<style scoped>

</style>
