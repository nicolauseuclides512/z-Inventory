<template>
  <!-- Group -->
  <div class="container bt-1 ">
    <div class="row">
      <div class="col-md-12 p-b-20 bt-1">
        <h5 class="title">Group</h5>
        <div class="form-horizontal">
          <div class="col-md-6">
            <div class="form-group form-general m-b-20">
              <label class="col-md-4 control-label text-left">Item Category</label>
              <div class="col-md-7 pl-pr-0">
                <select v-model="form.category_id" class="form-control" placeholder="Select or Type to Add">
                  <option v-for="cat in list.categories" :value="cat.category_id">{{ cat.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <!--<div class="col-md-6">-->
            <!--<div class="form-group form-general m-b-20">-->
              <!--<label class="col-md-2 control-label text-left">Tags</label>-->
              <!--<div class="col-md-9">-->
                <!--<vuetagger :value="tagsValue" @change="updateTags"></vuetagger>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
  <!-- Group END -->
</template>

<script>

  import Vuetagger from '../../../Vuetagger'

  export default {

    name: 'ItemCreateGroup',

    components: {
      Vuetagger
    },

    data() {
      return {
        list: {
          categories: [],
          tags: [],
        },
        form: {
          category_id: null,
          tags: '',
        },
      }
    },


    computed: {
      tagsValue() {
        return !_.isEmpty(this.form.tags)
          ? this.form.tags.split(',')
          : []
      }
    },


    created() {

      Bus.$on('retrieveData', data => {
        this.list.categories = data.categories
      })

      /**
       * When parent call us to give him the data
       */
      Bus.$on('collectData', () => {
        Bus.$emit('retrieveDataFromGroup', _.cloneDeep(this.form))
      })

    },


    mounted() {
      this.initialize()
    },


    methods: {

      /**
       * Initialize
       */
      initialize() {
        const that = this

        $('.tags_cat').tagsInput({
          onAddTag(value) {
            that.list.tags.push(value)
          },
          onRemoveTag(value) {
            const index = that.list.tags.indexOf(value)
            that.list.tags.splice(index, 1)
          },
        })
      },


      /**
       * Update tags
       */
      updateTags(tags) {
        this.form.tags = tags.join(',')
      }


    },


  }
</script>
