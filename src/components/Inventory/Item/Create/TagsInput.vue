<template>
  <input id="tags" type="tags" class="tags">
</template>

<script>
  export default {

    name: 'ItemCreateTagsInput',

    data() {
      return {

      }
    },

    mounted() {
      $('#tags').tagsInput()
    },

  }
</script>
