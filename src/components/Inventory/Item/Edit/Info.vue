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
              <input
                ref="name"
                :value="name"
                @keyup="changeName"
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
                <!--@add="addImage"-->
                <!--@delete="deleteImage"-->
                <!--@set-as-primary="setAsPrimary"-->
                <!--@clear="clearAll"-->
              <!--&gt;</image-upload>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left">Description</label>
            <div class="col-md-9 custom-summernote">
              <textarea
                ref="description"
                :value="description"
                @input="changeDescription"
                rows="5"
                class="summernote form-control"
              ></textarea>
              <!--@keyup="changeInfo('description', $event)"-->
            </div>
          </div>

          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left text-danger">
              SKU
              <!--<div><small class="text-muted">This field is required</small></div>-->
            </label>
            <div class="col-md-3">
              <input
                ref="sku"
                :value="sku"
                @input="changeSKU"
                type="text"
                class="form-control"
                placeholder=""
                required
              />
              <!--<div v-show="item_name && !item_name.length > 0" class="help-text">Please fill this field</div>-->
              <!--@keyup="changeInfo('title', $event)"-->
            </div>
          </div>

          <div class="form-group form-general m-b-20">
            <label class="col-md-2 control-label text-left text-danger">
              Price
              <!--<div><small class="text-muted">This field is required</small></div>-->
            </label>
            <div class="col-md-3">
              <div class="input-group">
                <span class="input-group-addon">Rp</span>
                <input
                  ref="price"
                  :value="price"
                  @input="changePrice"
                  type="text"
                  class="form-control text-right"
                  placeholder=""
                  required
                />
              </div>
              <!--<div v-show="item_name && !item_name.length > 0" class="help-text">Please fill this field</div>-->
              <!--@keyup="changeInfo('title', $event)"-->
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
  import axios from 'axios'
  import {swal_success} from "src/helpers";

  export default {

    name: 'ItemInfo',

    components: {
      'ImageUpload': require('../ImageUpload')
    },

    props: {
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      sku: {
        type: String,
        default: ''
      },
      price: {
        type: Number,
        default: 0
      },
    },

    methods: {

      changeName () {
        this.$emit('change-name', this.$refs.name.value)
      },

      changeDescription () {
        this.$emit('change-description', this.$refs.description.value)
      },

      changeSKU () {
        this.$emit('change-sku', this.$refs.sku.value)
      },

      changePrice () {
        this.$emit('change-price', this.$refs.price.value)
      },


      async setAsPrimary(image) {
        const imageList = _.cloneDeep(this.images)
        const currentImage = _.cloneDeep(image)

        _.each(imageList, (item, index) => {
          item.is_main = currentImage.data === item.data;
        })

        store.commit('itemForm/IMAGES', imageList)
      },


      async addImage(imageData) {
        const item_id = this.$route.params.id

        try {
          const response = await axios.post(`/items/${item_id}/images/add`, {
            is_main: imageData.is_main,
            data: imageData.data
          })

          console.log(_.cloneDeep(response.data), 'DATADATA')

          // Current image list
          const imageList = _.cloneDeep(this.images)
          imageList.push({
            is_main: response.data.data.is_main,
            media_url: response.data.data.media_url,
            item_id: response.data.data.item_id,
            item_media_id: response.data.data.item_media_id,
            item_media_status: response.data.data.item_media_status,
            is_resized: response.data.data.is_resized,
            media_type: response.data.data.media_type,
            organization_id: response.data.data.organization_id,
          })
          store.commit('itemForm/IMAGES', imageList)

          console.log(response.data)

        } catch (err) {
          console.error(err)
        }
      },


      async deleteImage(image) {
        const item_id = image.item_id
        const image_id = image.item_media_id

        try {
          const response = await axios.delete(`items/${item_id}/images/remove/${image_id}`)

          const imageList = _.cloneDeep(this.images)
          imageList.splice(imageList.indexOf(image), 1)
          store.commit('itemForm/IMAGES', imageList)

          swal_success(response)
          console.log(response)
        } catch (err) {
          console.error(err)
        }
      },


      async clearAll() {
        const imageList = _.cloneDeep(this.images)

        for (let image of imageList) {
          const item_id = image.item_id
          const image_id = image.item_media_id

          try {
            const response = await axios.delete(`items/${item_id}/images/remove/${image_id}`)

            imageList.splice(imageList.indexOf(image), 1)
            store.commit('itemForm/IMAGES', imageList)

            console.log(response)
          } catch (err) {
            console.error(err)
          }
        }
      }
    }

  }
</script>
