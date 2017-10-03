<template>
  <div>

    <form method="POST" @submit.prevent="save">

      <div class="full-width-header bt-1 p-b-10 m-b-20">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pull-left page-title">Edit Collection</h4>
          </div>
        </div>
      </div>
      <!-- info -->
      <div class="bt-1">
        <div class="row">
          <div class="col-md-12 p-b-20">
            <h5 class="title">Info</h5>
            <div class="form-horizontal">
              <div class="form-group form-general m-b-20">
                <label class="col-md-2 control-label text-left">Name</label>
                <div class="col-md-9">
                  <input type="text" id="name" class="form-control" placeholder="" v-model="form.name">
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label class="col-md-2 control-label text-left">Images</label>
                <div class="col-md-9">
                  <div class="row" v-show="!form.image">
                    <div class="col-md-4">
                      <a href="javascript:void(0)" id="image" @click="openFileBrowser">
                        <div class="image-placeholder">
                          <i class="fa fa-image fa-3x"></i> <br> Browse Image
                        </div>
                      </a>
                      <input ref="file" name="file" type="file" id="file" @change="changeImage" accept="image/*" style="display: none;">
                    </div>
                  </div>
                  <div class="row" v-show="form.image">
                    <div class="col-md-5 mbt-15">
                      <img :src="form.image" class="img-responsive img-thumbnail" style="max-width: 500px;">
                      <a href="javascript:void(0)" style="font-size:.95em" @click="removeImage">Remove Image</a> |
                      <a href="javascript:void(0)" style="font-size:.95em" @click="openFileBrowser">Change Image</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group form-general m-b-20">
                <label for="description" class="col-md-2 control-label text-left">Description</label>
                <div class="col-md-9 custom-summernote">
                  <textarea id="description" v-model="form.description" class="form-control" rows="7" maxlength="500"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- conditions -->
      <div class="container bt-1 ">
        <div class="row">
          <div class="col-md-12 p-b-20 bt-1">
            <conditions :conditions="form.conditions" :match="form.is_match_all"></conditions>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row ">
          <div class="col-md-12 pt-15">
            <a href="javascript:void(0);"
               @click="destroy"
               class="btn btn-default waves-effect waves-light hover-red">
              Delete
            </a>
          </div>
        </div>
      </div>


      <div class="float-save">
        <div class="row">
          <div class="col-md-6 text-left">
            <h5>Published</h5>
            <div class="checkbox checkbox-inline checkbox-success ">
              <input type="checkbox" id="online_store" v-model="form.visibility.online_store">
              <label for="online_store"> Online Store </label>
            </div>
            <div class="publish-date" v-show="form.visibility.online_store">
              <div class="input-group date" id="publish_date">
                <span class="input-group-addon">
                  <i class="md md-event"></i>
                </span>
                <p>Published on </p>
                <input type="text" id="publish_time" v-model="form.publish_time" class="form-control" required>
              </div>
            </div>
          </div>
          <div class="col-md-6 text-right">
            <div>
              <button type="submit"
                      id="save"
                      class="btn btn-info waves-effect waves-light mr-20"
                      :disabled="saving">
                <span v-show="!saving">Save</span>
                <span v-show="saving">Saving...</span>
              </button>
              <button @click="backToList" id="cancel" class="btn btn-default waves-effect" type="button" :disabled="saving">Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </form>

  </div>
</template>

<script>

  export default {
    name: 'CollectionEdit',

    components: {
      'custom-seo': require('./Seo'),
      'conditions': require('./Conditions'),
    },


    data() {
      return {
        saving: false, // Saving state
        custom_seo: true,
        fileInput: null,
        originalImage: null,
        form: {
          name: '',
          description: '',
          page_title: '',
          meta_description: '',
          slug: '',
          visibility: {
            online_store: true
          },
          is_match_all: 1,
          conditions: [],
          items: '',
          item_collection_status: 1,
          image: null,
          publish_time: null,
        }
      }
    },


    mounted() {
      this.fileInput = this.$refs.file

      $('#publish_date').datepicker({
          orientation: "bottom left",
          format: "dd M yyyy",
          autoclose: true
      })


      this.$http.get('collections/'+ this.$route.params.id +'/edit')
        .then(res => {
          if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

          this.form = res.data.data.collection
          this.originalImage = this.form.image

          // If condition is an empty string.
          if (!_.isArray(this.form.conditions)) {
            this.form.conditions = []
          }

        }, res => {
          return swal_error(res)
        })
    },


    methods: {

      /**
       * Remove the image
       */
      removeImage() {
        this.form.image = null
        this.fileInput.files = null
      },


      /**
       * Open file browser
       */
      openFileBrowser() {
        this.fileInput.click()
      },


      /**
       * Change the image
       */
      changeImage() {
        if (this.fileInput.files.length > 0) {

          const file = this.fileInput.files[0]
          const reader = new FileReader()

          reader.onloadend = () => {
            this.form.image = reader.result
          }

          reader.readAsDataURL(file)
        }

      },


      /**
       * Back to collection list
       */
      backToList() {
        this.$router.push({ name: 'collection.index' })
      },


      /**
       * Save
       */
      save() {

        const collection_id = this.$route.params.id

        if (_.isEmpty(this.form.page_title)) {
          this.form.page_title = this.form.name
        }

        if (_.isEmpty(this.form.slug)) {
          this.form.slug = this.slugify(this.form.name)
        }

        if (_.isEmpty(this.form.meta_description)) {
          this.form.meta_description = this.form.description
        }

        this.saving = true

        this.$http.post('collections/' + collection_id + '/update', this.form)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) {
              this.saving = false
              return swal_error(res)
            }

            this.updateImage(collection_id)

            this.backToList()
            return swal_success(res)

          }, res => {
            this.saving = false
            return swal_error(res)
          })

      },


      /**
       * Update image
       */
      updateImage(collection_id) {
        if (!this.form.image) {
          this.$http.delete('collections/' + collection_id + '/remove_image')
            .then(res => {
              if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)
            }, res => {
              return swal_error(res)
            })

          return
        }

        if (this.form.image !== this.originalImage) {
          this.$http.post('collections/' + collection_id + '/update_image', { image: this.form.image })
            .then(res => {
              if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)
              this.originalImage = this.form.image = res.data.data.image
            }, res => {
              return swal_error(res)
            })
        }
      },


      /**
       * Delete collection
       */
      destroy() {
        Alert.confirm({
          title: 'Are you sure you want to delete this collection?',
          text: 'Deleted collection cannot be recovered. Do you still want to continue?',
        }, () => {

          const id = this.$route.params.id

          this.$http.delete('collections', { body: { ids: id } })
            .then(res => {
              if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

              this.$router.push({name: 'collection.index'})

              return swal_success(res)

            }, res => {
              return swal_error(res)
            })

        })
      },


      /**
       * Convert string to slug https://gist.github.com/mathewbyrne/1280286
       * We don't handle UTF-8 characters
       * @return {string} Slugish string
       */
      slugify(string) {
        return string.toString().toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '')             // Trim - from end of text
      },


    },
  }
</script>

<style scoped>
  .image-placeholder {
    position: relative;
    text-align: center;
    background: #f9f9f9;
    border: 1px dashed #e9e9e9;
    padding: 60px 0;
    border-radius: 4px;
  }
</style>
