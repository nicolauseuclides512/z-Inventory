<template>
  <div>
    <a href="javascript:void(0)"
       data-type="text"
       :data-title="title"
       class="editable editable-click"
       style="display: inline-block;"
       @click="editable"
       v-show="!editMode"
    >
      {{ text }}
    </a>
    <span class="editable-container editable-inline" style="" v-show="editMode">
    <div>
      <div class="editableform-loading" style="display: none;"></div>
      <form @submit.prevent method="POST" class="form-inline editableform">
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control input-sm" style="padding-right: 24px;" v-model="newText">
            <div class="input-group-btn">
              <button @click="done" type="submit" :disabled="doneButton" class="btn btn-success btn-sm waves-effect waves-light"><i class="md md-done"></i></button>
              <button @click="cancel" type="button" class="btn btn-default btn-sm waves-effect waves-light"><i class="md md-clear"></i></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </span>
  </div>
</template>

<script>
  export default {

    props: ['keyid', 'text', 'title'],


    data() {
      return {
        editMode: false,
        newText: '',
      };
    },


    computed: {
      doneButton() {
        if (!this.newText) {
          return true;
        }
        return false;
      }
    },


    methods: {

      editable() {
        this.newText = this.text;
        this.editMode = true;
      },

      done() {

        this.$emit('change', this.keyid, this.newText);

        if (this.newText.length > 0) {
          this.editMode = false;
        }
      },

      cancel() {
        this.editMode = false;
      }

    }

  }


</script>
