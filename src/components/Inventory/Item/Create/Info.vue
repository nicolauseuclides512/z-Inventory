<template>
  <!-- Info -->
  <div class="container bt-1">
    <div class="row">
      <div class="col-md-12 p-b-20">
        <h5 class="title">Info</h5>
        <div class="form-horizontal">
          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left text-danger">
              Name
              <!--<div><small class="text-muted">This field is required</small></div>-->
            </label>
            <div class="col-md-9">
              <input v-model.trim="item_name"
                     type="text"
                     class="form-control"
                     placeholder=""
                     required
              />
              <!--<div v-show="item_name && !item_name.length > 0" class="help-text">Please fill this field</div>-->
                     <!--@keyup="changeInfo('title', $event)"-->
            </div>
          </div>
          <!--<div class="form-group form-general m-b-20">-->
            <!--<label class="col-md-2 control-label text-left">Images</label>-->
            <!--<div class="col-md-9">-->
              <!--<image-upload-->
                <!--:images="images"-->
                <!--@update="updateImage"-->
                <!--@delete="deleteImage"-->
                <!--@clear="clearAll"-->
                <!--@set-as-primary="setAsPrimary"-->
              <!--&gt;</image-upload>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left">Description</label>
            <div class="col-md-9 custom-summernote">
              <textarea class="summernote form-control" v-model="description"></textarea>
              <!--@keyup="changeInfo('description', $event)"-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Info END -->
</template>

<script>
  import store from 'src/store'

  export default {

    name: 'ItemCreateInfo',

    components: {
      'image-upload': require('../ImageUpload')
    },

    computed: {
      item_name: {
        get() { return store.state.itemForm.item_name },
        set(value) { store.commit('itemForm/ITEM_NAME', value) },
      },
      description: {
        get() { return store.state.itemForm.description },
        set(value) { store.commit('itemForm/DESCRIPTION', value) },
      },
      images: {
        get() { return store.state.itemForm.images },
        set(value) { store.commit('itemForm/IMAGES', value) },
      },
    },


    methods: {

      async setAsPrimary(image) {
        const imageList = _.cloneDeep(this.images)
        const currentImage = _.cloneDeep(image)

        _.each(imageList, (item, index) => {
          item.is_main = currentImage.data === item.data;
        })

        store.commit('itemForm/IMAGES', imageList)
      },

      updateImage(images) {
        store.commit('itemForm/IMAGES', images)
      },

      deleteImage(image) {
        const imageList = _.cloneDeep(this.images)
        const currentImage = _.cloneDeep(image)
        const currentImageStatus = currentImage.is_main

        // If current primary image has been removed, set the first image as primary
        if (currentImageStatus && this.images.length > 0) {
          imageList[0].is_main = true
        }

        imageList.splice(imageList.indexOf(currentImage), 1)

        store.commit('itemForm/IMAGES', imageList)
      },


      clearAll() {
        store.commit('itemForm/IMAGES', [])
      }
    }

  }
</script>
