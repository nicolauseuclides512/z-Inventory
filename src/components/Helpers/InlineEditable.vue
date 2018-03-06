<template>
  <div>

    <div v-if="!editMode" col-sx-12>
      <a href="javascript:;" @click="showInlineEditor($event)">
        <span v-if="output">{{ newValue | money }}</span>
        <span v-else>{{ newValue }}</span>
      </a>
    </div>

    <div v-else>

      <form method="POST" @submit.prevent="save">

        <div class="input-group col-sx-12">
          <input type="number" v-model="newValue" class="form-control" min="0" required>
          <div class="input-group-btn">
            <button type="submit" class="btn btn-primary editable-submit btn-sm waves-effect waves-light"><i class="md md-done"></i></button>
            <button type="button" @click="hideInlineEditor" class="btn editable-cancel btn-sm waves-effect waves-light"><i class="md md-clear"></i></button>
          </div>
        </div>

      </form>

    </div>

  </div>
</template>

<script>
  export default {


    props: {
      itemId: {},
      value: null,
      output: null,
    },


    data() {
      return {
        newValue: null,
        editMode: false,
        originalValue: null,
      }
    },


    mounted() {
      this.newValue = this.value
    },


    methods: {

      save() {
        this.$emit('change', {
          itemId: this.itemId,
          value: Number(this.newValue),
          oldValue: Number(this.originalValue),
        })
      },


      showInlineEditor(ev) {
        this.originalValue = this.value
        this.editMode = true
      },


      hideInlineEditor() {
        this.newValue = this.originalValue
        this.editMode = false
      }


    },


    directives: {
      'input-focus'() {
        const el = this.el

        setTimeout(() => {
          el.focus()
          el.select()
        }, 0)
      }
    },


  }
</script>

<style scoped>
  a {
    border-bottom: 1px dashed;
  }
</style>
