<template>
  <div class="image-uploader">

    <header>
      <div v-if="!loading">
        <a href="javascript:;" @click="openFileManager" class="btn btn-primary">Add Images</a>
        <!--<a href="javascript:;" @click="promptUrl" class="btn btn-primary">Image URL</a>-->
        <!--<a href="javascript:;" @click="promptYoutube" class="btn btn-primary">Youtube URL</a>-->
        <a href="javascript:;" @click="clearAll" v-show="this.images.length > 0" class="btn btn-default">Clear all</a>
      </div>
      <div v-else> Please wait... </div>
    </header>

    <input ref="fileUploader" type="file" multiple accept="image/*" @change="addFromFile" style="display: none;">

    <section class="image-uploader-container">
      <div v-show="!images.length" class="bg"></div>
      <div class="row">
        <div v-show="images.length" v-for="image in images">
          <div class="col-xs-3">

            <div class="image-uploader-container-item" style="max-height: 150px">
              <div
                :class="{ primary: image.is_main, 'image thumbnail': true }"
                :style="{
                  'background-image': `url(${'media_url' in image ? image.media_url : image.data})`,
                }"
              >

                <div class="image-uploader-container-item-action clearfix">
                  <a href="javascript:void(0);" @click="remove(image)" title="Remove image" class="delete-btn">&times;</a>
                  <a v-show="!image.is_main" href="javascript:void(0);" @click="setAsPrimary(image)" title="Set as primary image" class="set-as-primary-btn"> Set as primary </a>
                  <span v-show="image.is_main"  class="set-as-primary-btn">Primary image</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import swal from 'sweetalert2'
  import axios from 'axios'
  import store from 'src/store'

  export default {

    props: ['images'],

    data () {
      return {
        loading: false,
        inputElement: null,
        fileUploader: null,
        formUploader: null,
      };
    },


    mounted () {
      this.initialize()
    },

    methods: {

      initialize() {
        this.fileUploader = this.$refs.fileUploader
      },

      setAsPrimary (image) {
        this.$emit('set-as-primary', image)
      },

      promptUrl() {
        const that = this

        swal({
          title: "Insert image URL",
          type: "question",
          input: 'text',
          showCancelButton: true,
          animation: "slide-from-top",
          inputPlaceholder: "http://",
          inputValidator(inputValue) {
            return new Promise((resolve, reject) => {
              if (inputValue.match(/\.(jpe?g|png)/)) {
                that.addFromUrl(inputValue)
                resolve()
              } else {
                reject('Invalid image URL or image not supported')
              }
            })
          }
        }).then(inputValue => {

        }).catch(swal.noop)
      },


      /**
       * Prompt Youtube URL
       * @param  {string} url
       * @return {string} URL
       */
      promptYoutube(url) {
        const that = this

        swal({
          title: "Insert Youtube URL",
          type: "question",
          input: 'text',
          showCancelButton: true,
          animation: "slide-from-top",
          inputPlaceholder: "http://",
          inputValidator(inputValue) {
            return new Promise((resolve, reject) => {
              if (inputValue.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/)) {
                that.addYoutube(inputValue)
                resolve()
              } else {
                reject('Invalid youtube URL')
              }
            })
          }
        }).then(inputValue => {

        }).catch(swal.noop);
      },


      /**
       * Add Youtube
       * @param {string} url
       */
      addYoutube(url) {

        const noembed_url = 'https://noembed.com/embed?url=' + url

        this.$http.get(noembed_url)
          .then(res => {

            const data = res.data

            let primary = false
            if (!this.images.length) {
              primary = true
            }

            // Don't accept more than 8 medias
            if (this.images.length > 7) return;

            this.images.push({
              data: data.url,
              is_main: primary,
              thumbnail: data.thumbnail_url,
            })

            return true

          }, res => {
            swal_error(res)
            return false
          })
      },

      /**
       * Add image from URL
       * TODO: After some changes on server, we don't really need
       *       to convert external url image to canvas. We could
       *       just submit url inside of "data" key.
       * @param {String} url
       */
      addFromUrl(url) {
        let primary = false
        if (!this.images.length) {
          primary = true
        }

        // Don't accept more than 8 medias
        if (this.images.length > 7) return;

        this.images.push({
          data: url,
          is_main: primary,
          thumbnail: url,
        })
      },


      addFromFile () {
        const files = this.$refs.fileUploader.files
        const that = this
        _.each(files, (file, index) => {
          // Don't accept more than 8 medias
          if (index > 7) return;

          this.addToList(file, index)
        })

        // We need this element only for FileReader.
        // After that, it's safe to empty all values.
        this.$refs.fileUploader.value = ''
      },

      addToList (file, index) {
        const reader = new FileReader()

        reader.onload = () => {
          let primary = false

          // First image will be primary image
          if (!this.images.length) {
            primary = true
          }

          const imageList = _.cloneDeep(this.images)

          const imageData = {
            data: reader.result,
            is_main: primary,
            thumbnail: reader.result,
          }

          imageList.push(imageData)

          this.$emit('add', imageData) // Used for edit item
          this.$emit('update', imageList) // Used for update image list
        }

        reader.onloadstart = () => {
          this.loading = true
        }

        reader.onloadend = () => {
          this.loading = false
        }

        reader.readAsDataURL(file)
      },

      openFileManager () {
        this.fileUploader.click()
      },

      clearAll() {
        this.$emit('clear')
      },

      remove (image) {
        this.$emit('remove', image)
      }

    }

  }
</script>

<style scoped>

  .image-uploader-container {
    background: #f0f0f0;
    border: 1px solid #d9d9d9;
    min-height: 240px;
    margin: 10px 0;
    padding: 10px;
    border-radius: 2px;
  }

  .image {
    width: 154px;
    height: 154px;
    background-image: url('http://placehold.it/154');
    background-size: cover;
    background-position: top left;
  }

  .image.primary {
    border-top: 4px solid #0E4B8E;
    border-right: 4px solid #0E4B8E;
    border-left: 4px solid #0E4B8E;
    border-bottom: 4px solid #0E4B8E;
    border-radius: 2px;
  }

  .image:hover .image-uploader-container-item-action {
    display: block;
  }

  .image-uploader-container-item-action {
    display: none;
    background: rgba(0, 0, 0, 0.3);
    /*margin-bottom: 10px;*/
  }

  .delete-btn {
    background: #F04B59;
    padding: 0 5px;
    color: white;
    text-shadow: 1px 1px 0 #666;
    float: left;
  }

  .delete-btn:hover {
    background: #F04B90;
  }

  .set-as-primary-btn {
    float: right;
    color: white;
    margin-right: 5px;
    font-size: 12px;
  }
</style>
