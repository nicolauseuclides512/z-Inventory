<template>
  <section id="store_detail" class="content sahito-user full-width bgr-white">

    <div v-if="loading" class="lead text-muted text-center">
      <i class="fa fa-spin fa-spinner fa-lg"></i> Loading Store Detail
    </div>
    <div v-else>
      <form method="POST" @submit.prevent="save">

        <div>
          <div class="container bt-1 bgr-white p-b-10">
            <div class="row">
              <div class="col-md-12">
                <h4 class="title">Store Detail</h4>
              </div>
            </div>
          </div>

          <div class="container setting-page-right-content">
            <div class="row">
              <div class="col-md-12 pt-20 m-b-20 pl-pr-15">
                <div class="form-horizontal">
                  <div class="form-group form-general m-b-20">
                    <label for="timezone_id" class="col-md-2 control-label text-left">Timezone</label>
                    <div class="col-md-6">
                      <select class="form-control"
                              data-placeholder="Select your default timezone"
                              id="timezone_id"
                              v-model="timezone_id"
                      >
                        <option value="0" hidden disabled>Select default timezone</option>
                        <option v-for="tz in timezoneList" :value="tz.id">{{ tz.name }}</option>
                      </select>
                    </div>
                  </div>
                  <!--<div class="form-group form-general m-b-20">-->
                    <!--<label for="weight" class="col-md-2 control-label text-left">Weight Unit</label>-->
                    <!--<div class="col-md-6">-->
                      <!--<div style="padding: 6px 0;">g (gram)</div>-->
                      <!--<select class="form-control" data-placeholder="Select default weight"-->
                              <!--id="weight"-->
                              <!--v-model="weight"-->
                      <!--&gt;-->
                        <!--<option value="0" hidden disabled>Select default weight</option>-->
                        <!--<option v-for="(name, key) in weightList" :value="key">-->
                          <!--{{ key }} ({{ name }})-->
                        <!--</option>-->
                      <!--</select>-->
                    <!--</div>-->
                  <!--</div>-->
                  <div class="form-group form-general m-b-20">
                    <label for="currency_id" class="col-md-2 control-label text-left">Base Currency</label>
                    <div class="col-md-6">
                      <select class="form-control"
                              data-placeholder="Select your default currency"
                              id="currency_id"
                              v-model="currency_id"
                      >
                        <option value="0" hidden disabled>Select default currency</option>
                        <option v-for="c in currencyList" :value="c.id">({{ c.code }}) {{ c.name }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group form-general m-b-20">
                    <label for="language_id" class="col-md-2 control-label text-left">Language</label>
                    <div class="col-md-6">
                      <select class="form-control"
                              data-placeholder="Select your default language"
                              id="language_id"
                              v-model="language_id"
                      >
                        <option value="0" hidden disabled>Select default language</option>
                        <option v-for="lang in languageList" :value="lang.id">{{ lang.name }}</option>
                      </select>
                    </div>
                  </div>

                  <tax></tax>

                </div>
              </div>
            </div>
          </div>

          <div class="container p-b-10 m-b-20">
            <div class="row">
              <div class="col-md-12 text-center">
                <button type="submit" class="btn btn-info waves-effect waves-light">Save</button>
                <button type="button" @click="resetForm" class="btn btn-default waves-effect">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  </section>
</template>

<script>
  import store from '../../store'

  export default {
    name: 'StoreDetail',

    components: {
      'tax': require('./Tax'),
    },

    data() {
      return {
        loading: false,
        weight_units: { kg: 'kilogram', gr: 'gram' },
      }
    },

    mounted() {
      //
    },

    computed: {
      timezoneList() {
        return store.state.settings.store_detail.timezoneList
      },
      currencyList() {
        return store.state.settings.store_detail.currencyList
      },
      weightList() {
        return store.state.settings.store_detail.weightList
      },
      languageList() {
        return store.state.settings.store_detail.languageList
      },
      timezone_id: {
        get() { return store.state.settings.store_detail.timezone_id },
        set(value) { store.commit('settings/store_detail/TIMEZONE', value) }
      },
      weight: {
        get() { return store.state.settings.store_detail.weight },
        set(value) { store.commit('settings/store_detail/WEIGHT', value) }
      },
      currency_id: {
        get() { return store.state.settings.store_detail.currency_id },
        set(value) { store.commit('settings/store_detail/CURRENCY', value) }
      },
      language_id: {
        get() { return store.state.settings.store_detail.language_id },
        set(value) { store.commit('settings/store_detail/LANGUAGE', value) }
      },
    },


    methods: {

      /**
       * Save
       */
      save() {
        store.dispatch('settings/store_detail/save')
      },


      /**
       * Reset to original form state
       */
      resetForm() {
        store.dispatch('settings/initialize')
      },


    }
  }
</script>
