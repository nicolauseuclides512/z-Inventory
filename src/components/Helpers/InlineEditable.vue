<template>
  <div>

    <div v-if="!editMode" col-sx-12>
      <a href="javascript:;" @click="showInlineEditor($event)">
        <span v-if="output">{{ newValue | money }}</span>
        <span v-else>{{ newValue }}</span>
        <span><i class="ion-ios7-pricetag-outline" style="color:#2FA3E6"></i></span>
      </a>
    </div>

    <div v-else>

      <form method="POST" @submit.prevent="save">

        <div class="input-group col-sx-12">
          <money v-if="isMoney" v-model="newValue" v-bind="money" class="form-control" />
          <input v-else type="number" v-model="newValue" class="form-control" min="0" required>
          <div class="input-group-btn">
            <button type="submit" class="btn btn-primary editable-submit btn-sm waves-effect waves-light">
              <span v-if="isAdd">Add</span>
              <i v-else class="md md-done"></i>
            </button>

            <button type="button" @click="hideInlineEditor" class="btn editable-cancel btn-sm waves-effect waves-light"><i class="md md-clear"></i></button>
          </div>
        </div>

      </form>

    </div>

  </div>
</template>

<script>
  import {Money} from 'v-money'
  export default {


    props: {
      isMoney:false,
      isAdd: false,
      item: null,
      value: null,
      output: null,
    },


    data() {
      return {
        newValue: null,
        editMode: false,
        originalValue: null,
        price: 123.45,
        money: {
          // decimal: ',',
          thousands: '.',
          prefix: 'Rp ',
          // suffix: ' #',
          precision: 0,
          masked: false
        }
      }
    },


    watch: {
      value(value) {
        this.newValue = value
      }
    },


    mounted() {
      this.newValue = this.value
    },


    methods: {

      save() {
        this.$emit('update', {
          item: this.item,
          value: Number(this.newValue),
          oldValue: Number(this.originalValue),
        })
        this.hideInlineEditor()
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
    /* border-bottom: 1px dashed; */
    color:#000;
  }
</style>
