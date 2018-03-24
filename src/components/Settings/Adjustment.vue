<template>
  <div class="content sahito-user" style="box-shadow:none!important;top:39px">
    <div id="sales_channel">
      <div class="container full-width-header bttop-1 pt-pb-10 m-b-20">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pull-left page-title">Adjustment Settings</h4>
          </div>
        </div>
      </div>
      <div class="container setting-page-right-content">
        <div class="alert alert-info">
          Anything you add here will be displayed when you <a href="#">add adjusment</a>
        </div>
        <div class="form-group">
          <div class="input-group col-xs-5">
            <input v-model="form.reason" @keyup.enter="add" type="text" class="form-control"
                   placeholder="Example: Stolen items">
            <div class="input-group-btn">
              <button @click="add" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
        <div v-if="!reasons.length">
          <div class="lead">You don't have any reasons</div>
        </div>
        <table v-if="reasons.length" class="table">
          <thead>
          <tr>
            <th>No.</th>
            <th>Reason</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(reason, index) in reasons">
            <td>{{ index + 1 }}</td>
            <td>{{ reason.reason }}</td>
            <td>
              <button class="btn btn-default" @click="remove(reason)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="alert alert-info">
          You can not delete a reason which you have used.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'

  export default {
    name: 'AdjustmentSetting',

    data () {
      return {
        reasons: [],
        form: new Form({
          category_code: 'ADJ',
          reason: '',
        }),
      }
    },

    async mounted () {
      this.getList()
    },

    methods: {

      async getList () {
        try {
          const res = await Axios.get(`reasons`)
          this.reasons = res.data.data
        }
        catch (err) {
          console.error(err)
        }
      },

      async add () {
        try {
          if(this.form.reason){
            const res = await Axios.post(`reasons`, this.form)
            this.getList()
            this.form.reason = ''
            Alert.success(`New reason has been added`)
          } else {
            Alert.error(`Whoops! Reason cannot empty`)
          }
        }
        catch (err) {
          console.error(err)
        }
      },

      async remove (reason) {
        try {
          Alert.confirm(`Are you sure want to delete this reason?`, async () => {
            const res = await Axios.delete(`reasons/${reason.reason_id}`)
            this.getList()
            Alert.success(`Reason has been deleted`)
          })
        }
        catch (err) {
          console.error(err)
        }
      },
    },
  }
</script>
