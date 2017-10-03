<template>
  <div>
    <!-- Search engine listing preview -->
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="pull-left">
            <h5 class="title">Search Engine Listing Preview </h5>
          </div>
          <div class="pull-right pt-10">
            <a href="javascript:void(0);" @click="showSeoEditor" v-show="!custom_seo">Edit Custom SEO</a>
            <a href="javascript:void(0);" @click="hideSeoEditor" v-show="custom_seo">Cancel Custom SEO</a>
          </div>
          <div class="form-group form-general m-b-20" v-show="custom_seo">
            <div class="col-md-12 seo-preview">
              <p class="seo-preview-title">{{ form.page_title }}</p>
              <p class="seo-preview-url">{{ base_url }}{{ form.slug }}</p>
              <p class="seo-preview-meta">{{ form.meta_description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- search engine listing form -->
    <div class="container" v-show="custom_seo">
      <div class="row">
        <div class="col-md-12">
          <div class="form-horizontal">
            <div class="form-group form-general m-b-20">
              <label class="col-md-3 control-label text-left">Page Title</label>
              <div class="col-md-8 pl-pr-0">
                <input type="text"
                       id="seo_title"
                       v-model="form.page_title"
                       @keyup="individualSeo($event)"
                       class="form-control"
                       placeholder=""
                       maxlength="70"
                       >
                <span class="help-text">{{ chars_length('page_title') }} of 70 characters used</span>
              </div>
            </div>
            <div class="form-group form-general m-b-20">
              <label class="col-md-3 control-label text-left">Meta Description</label>
              <div class="col-md-8 pl-pr-0">
                <textarea v-model="form.meta_description"
                          id="seo_description"
                          @keyup="individualSeo($event)"
                          class="form-control"
                          maxlength="160"
                          rows="3"></textarea>
                <span class="help-text">{{ chars_length('meta_description') }} of 160 characters used</span>
              </div>
            </div>
            <div class="form-group form-general m-b-20 url-handle">
              <label class="col-md-3 control-label text-left">URL to Handle</label>
              <div class="col-md-8 pl-pr-0">
                <div class="input-group">
                  <span class="input-group-addon">{{ base_url }}</span>
                  <input type="text"
                         v-model="form.slug"
                         id="seo_slug"
                         @keyup="individualSeo($event)"
                         class="form-control"
                         maxlength="50"
                         placeholder="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Search engine listing END -->
  </div>
</template>

<script>
  export default {

    name: 'ItemCreateSeo',

    data() {
      return {
        base_url: '',
        custom_seo: false,
        individual_seo: {
          title: false,
          description: false,
          slug: false,
        },

        // Save "info component's" data here. It's needed when canceling custom SEO.
        info: {
          title: '',
          description: '',
        },

        form: {
          page_title: '',
          meta_description: '',
          slug: '',
        },
      }
    },


    created() {
      Bus.$on('retrieveData', data => {
        this.base_url = data.url
      })

      Bus.$on('infoHasBeenChanged', data => {
        // Save this data for canceling custom SEO
        if (data.id === 'title') this.info.title = data.value
        if (data.id === 'description') this.info.description = data.value

        this.seoFollowMaster(data.id, data.value)
      })


      /**
       * When parent call us to give him the data
       */
      Bus.$on('collectData', () => {
        Bus.$emit('retrieveDataFromSeo', _.cloneDeep(this.form))
      })

    },


    mounted() {
      //
    },


    methods: {

      /**
       * Show SEO editor
       */
      showSeoEditor() {
        this.custom_seo = true
      },


      /**
       * Cancel and hide SEO editor
       */
      hideSeoEditor() {
        this.custom_seo = false
        this.individual_seo.title = false
        this.individual_seo.description = false
        this.individual_seo.slug = false

        this.form.page_title = this.info.title
        this.form.meta_description = this.info.description
      },


      /**
       * FIXME: We can clean up this method.
       * Individual SEO value
       * @param  {Event} ev
       */
      individualSeo(ev) {

        const el = $(ev.target) // I'm too lazy. Thanks to jQuery.

        if (el.attr('id') === 'seo_title') {
          if (_.trim(el.val()) === '') {
            this.individual_seo.title = false
            this.form.page_title = ''
          } else {
            this.individual_seo.title = true
          }
        }

        if (el.attr('id') === 'seo_description') {
          if (_.trim(el.val()) === '') {
            this.individual_seo.description = false
            this.form.meta_description = ''
          } else {
            this.individual_seo.description = true
          }
        }

        if (el.attr('id') === 'seo_slug') {
          if (_.trim(el.val()) === '') {
            this.individual_seo.slug = false
            this.form.slug = this.slugify(this.form.item_name)
          } else {
            this.individual_seo.slug = true
            this.form.slug = this.slugify(this.form.slug)
          }
        }
      },


      /**
       * SEO meta data following info data a.k.a master data
       */
      seoFollowMaster(id, value) {
        if (id === 'title' && this.individual_seo.title === false && value.length <= 70) {
          this.form.page_title = _.trim(value)
        }

        if (id === 'description'&& this.individual_seo.description === false && value.length <= 160) {
          this.form.meta_description = _.trim(value)
        }

        if (id === 'title' && this.individual_seo.slug === false) {
          this.form.slug = this.slugify(_.trim(value))
        }
      },


      /**
       * Return characters length of string
       * @return {Number}
       */
      chars_length(prop) {
        return this.form[prop].length || 0
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
