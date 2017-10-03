<template>
  <div>
    <div class="vuetagger">

      <div class="vuetagger-list">
        <span v-for="tag in tags" class="vuetagger-tag">
          {{ tag }} <span class="vuetagger-tag-remover" @click="remove(tag)">&times;</span>
        </span>
      </div>

      <input type="text"
        class="vuetagger-input"
        v-model="newTag"
        @keydown.enter.prevent="append"
        @keydown.space.prevent="append"
        @keydown.188.prevent="append"
        @keydown.delete="removeLastTag"
      />

    </div>
  </div>
</template>

<script>
  export default {

    props: {
      value: {
        type: Array,
        default: []
      },
      pattern: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        newTag: '',
        tags: []
      }
    },

    watch: {
      value(val) {
        // FIXME: Vuex issue
        this.tags = val
      }
    },

    mounted() {
      this.initialize()
    },

    methods: {

      /**
       * Initialize the tags
       */
      initialize() {
        const initialTags = this.value
        initialTags.forEach((tag) => {
          this.tags.push(tag)
        })
        this.$emit('change', this.convertToNormalObject(this.tags))
      },


      /**
       * Append new tag
       */
      append() {
        let tags = _.cloneDeep(this.tags)

        /**
         * Don't allow empty tag.
         */
        if (this.newTag.trim() === '') {
//          this.$emit('change', false)
          return
        }

        /**
         * Don't allow duplicate tags.
         */
        let duplicate = false

        tags.forEach((tag) => {
          if (tag === this.newTag.trim()) {
            duplicate = true
          }
        })

        if (duplicate) {
//          this.$emit('change', false)
          return
        }

        /**
         * Check new tag with regex pattern
         */
        const regex = new RegExp(this.pattern)
        if (this.pattern && ! regex.test(this.newTag)) {
//          this.$emit('change', false)
          return
        }

        /**
         * Everything looks good, let's add new tag.
         */
        tags.push(this.newTag.trim())
        this.newTag = ''
        this.$emit('change', this.convertToNormalObject(tags))
      },


      /**
       * Remove the selected tag
       * @param {string} tag  Tag name
       */
      remove(tag) {
        const index = this.tags.indexOf(tag)
        this.tags.splice(index, 1)
        this.$emit('change', this.convertToNormalObject(this.tags))
      },


      /**
       * Remove the last tag
       */
      removeLastTag() {
        let tags = _.cloneDeep(this.tags)

        if (this.newTag === '' && tags.length > 0) {
          tags.pop()
          this.$emit('change', this.convertToNormalObject(tags))
        }
      },

      convertToNormalObject(obj) {
        return JSON.parse(JSON.stringify(obj))
      }

    }
  }
</script>

<style scoped>
  .vuetagger {
    display: table;
    border: 1px solid #cecece;
    padding: 4px 8px;
    width: 100%;
  }

  .vuetagger-list {

  }

  .vuetagger-tag {
    background: #f0f0f0;
    padding: 0 0 0 8px;
    display: inline-block;
    margin-right: 4px;
    margin-bottom: 2px;
    cursor: default;
  }

  .vuetagger-input {
    padding: 4px;
    display: table-cell;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }

  .vuetagger-tag:hover .vuetagger-tag-remover{
    background: #cecece;
    color: white;
  }

  .vuetagger-tag-remover {
    padding: 4px 8px;
    display: inline-block;
    cursor: default;
    margin-left: 4px;
  }
</style>
