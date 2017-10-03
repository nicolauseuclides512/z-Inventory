<template>
  <div>

    <div v-if="!editMode">
      <a href="javascript:;" @click="showInlineEditor($event)">{{ newValue }}</a>
    </div>

    <div v-else>

      <form method="POST" @submit.prevent="save">

        <div class="input-group">
          <div v-if="type === 'text'">
            <input type="text" v-model="newValue" class="form-control" min="0" required>
          </div>
          <div v-if="type === 'number'">
            <input type="number" v-model="newValue" class="form-control" min="0" required>
          </div>
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
      item: {},
      type: null, // text or number
      url: '',
      name: '',
      value: null,
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

        let data

        if (this.name === 'sales_rate') {
          data = {new_price: this.newValue}
        }

        if (this.name === 'inventory_stock') {
          data = { new_inventory_stock: this.newValue }
        }

        this.$http.post(this.url, data)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.originalValue = this.newValue

            this.hideInlineEditor()

            swal_success(res)

          }, res => {
            return swal_error(res)
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
