<template>
  <div class="image-uploader">

    <header>
      <div v-if="!loading">
<!--         <a href="javascript:;" @click="openFileManager" class="btn btn-primary">Add Images</a>
        <a href="javascript:;" @click="promptUrl" class="btn btn-primary">Image URL</a>
        <a href="javascript:;" @click="promptYoutube" class="btn btn-primary">Youtube URL</a>
        <a href="javascript:;" @click="clearAll" v-show="this.images.length > 0" class="btn btn-default">Clear all</a> -->
      </div>
      <div v-if="loading">
        <Spinner></Spinner>
      </div>
    </header>

    <input ref="fileUploader" type="file" multiple accept="image/*" @change="addFromFile" style="display: none;">

    <section class="image-uploader-container wrap-uploader">
      <!-- <div v-show="!images.length" class="bg">
      </div> -->
        <div v-if="!images.length  && !uploading" class="image-uploader-container-item">
          <div @click="openFileManager" class="add-new-image-btn2 p-0" style="cursor:pointer">
            <i class="fa fa-image" style="font-size:12px"></i><br>
            <p style="font-size:12px"> + Upload Image </p>
          </div>
        </div>
        <div v-if="uploading" class="image-uploader-container-item add-new-image-btn2">
          <SpinnerSmall></SpinnerSmall>
        </div>
        <div class="uploaded-wrap" v-if="images.length && !uploading" v-for="image in images">
          <div class="uploaded-image">

            <div class="image-uploader-container-item">
              <div
                :class="{ primary: image.is_main, 'image thumbnail': true }"
                :style="{
                  'background-image': `url(${'media_url' in image ? image.media_url : image.data})`,
                }"
                style="margin-bottom:0px"
              >

                <span v-if="image.is_main" class="set-as-primary-btn">Primary image</span>
                <div class="image-uploader-container-item-action clearfix">
                  <a href="javascript:void(0);" @click="remove(image)" title="Remove image" class="delete-btn">&times;</a>
                  <a v-if="!image.is_main" href="javascript:void(0);" @click="setAsPrimary(image)" title="Set as primary image" class="set-as-primary-btn set"> Set as primary </a>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div v-if="images.length < limit" v-show="images.length" class="uploaded-wrap">
            <div class="image-uploader-container-item">
              <div v-if="uploading" class="add-new-image-btn p-0">
                <SpinnerSmall ></SpinnerSmall>
              </div>
              <div v-if="!uploading" @click="openFileManager" class="add-new-image-btn p-0">
                <i class="fa fa-image" style="font-size:12px"></i><br>
                <p style="font-size:12px">+ Add New Image</p>
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

    components: {
      Spinner: () => import('@/components/Helpers/Spinner'),
      SpinnerSmall: () => import('@/components/Helpers/SpinnerSmall'),
    },

    props: {
      limit: {
        type: Number,
        default: 999
      },
      images: {
        type:Array
      },
      uploading: {
        type: Boolean,
        default: false
      },
    },

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

        // Don't accept more than 5 medias
        if (this.images.length > this.limit) return;

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

<style scoped lang="scss">
  .image-uploader-container.wrap-uploader{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding-top: 0;
    flex-direction: row;
    flex-wrap: wrap;
    min-height:165px;
    .image-uploader-container-item {
      flex: 1;
    }
    .uploaded-wrap{
      margin: 5px 0;
      display: block;
    }
    .image-uploader-container-item .image.thumbnail,
    .primary.image.thumbnail{
      margin: 0;
      background-size: contain !important;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .image-uploader-container {
    background:transparent;
    height: 100%;
    width: 100%;
    min-height: 165px;
    border-radius: 2px;
  }

  .image {
    width: 180px;
    height: 180px;
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
    // background: rgba(0, 0, 0, 0.3);
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
    padding: 5px;
    border-radius: 2px;
    font-weight: bold;
    background: #006090;
    &.set{
      background: #acacac;
    }
  }

  .add-new-image-btn {
  border: 1px dashed #999;
  width: 180px;
  height: 180px;
  padding: 10px;
  color: #999;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-new-image-btn:hover {
  color: white;
  background: #89b5eb;
}

  .add-new-image-btn2 {
  border: 1px dashed #999;
  width: 100%;
  height: 165px;
  padding: 10px;
  color: #999;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-new-image-btn2:hover {
  color: white;
  background: #89b5eb;
}
</style>
