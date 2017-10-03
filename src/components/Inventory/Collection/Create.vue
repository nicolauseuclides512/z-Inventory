<template>
  <div>

    <form method="POST" @submit.prevent="save">

      <div class="full-width-header bt-1 p-b-10 m-b-20">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pull-left page-title">New Collection</h4>
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
                <div class="col-md-9">
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
            <button type="submit" id="save" class="btn btn-info waves-effect waves-light mr-20">Save</button>
            <button @click="backToList" id="cancel" class="btn btn-default waves-effect" type="button">Cancel</button>
          </div>
        </div>
      </div>

    </form>

  </div>
</template>

<script>

  import { format as dateFormat } from 'date-fns'

  export default {
    name: 'CollectionCreate',

    components: {
      'custom-seo': require('./Seo'),
      'conditions': require('./Conditions'),
    },


    data() {
      return {
        url: '',
        fileInput: null,
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
          publish_time: new Date(),
        }
      }
    },


    events: {
      //
    },


    mounted() {
      this.fileInput = this.$refs.file

      $('#publish_date').datepicker({
          orientation: "bottom left",
          format: "dd M yyyy",
          autoclose: true
      });

      this.$http.get('collections/create')
        .then(res => {
          if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)
          this.url = res.data.data.url
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

        this.$http.post('collections', this.form)
          .then(res => {
            if ([0, 200, 201].indexOf(res.data.code) === -1) return swal_error(res)

            this.backToList()
            return swal_success(res)

          }, res => {
            return swal_error(res)
          })

      }


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
