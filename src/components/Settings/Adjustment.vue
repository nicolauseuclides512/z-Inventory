<template>
  <div class="content sahito-user bgr-white">
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
            <input v-model="form.name" type="text" class="form-control" placeholder="Example: Stolen items">
            <div class="input-group-btn">
              <button @click="add" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
        <div v-if="!reasons.length">
          <div class="lead">You don't have any reasons</div>
        </div>
        <table v-if="reasons.length" class="table table-striped">
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
        reasons: [
          {id: 1, name: 'Stolen items'},
        ],
        form: new Form({
          name: '',
        }),
      }
    },

    async mounted () {
      try {
        const res = await Axios.get(``)
        this.reasons = res.data.data
      }
      catch (err) {
        console.error(err)
      }
    },

    methods: {
      async add () {
        try {
          const res = await Axios.post(``, this.form)

          this.reasons.push(this.form)

          this.form.name = ''
        }
        catch (err) {
          console.error(err)
        }
      },

      async remove (reason) {
        try {
          const res = await Axios.delete(``)

          const index = this.reasons.indexOf(reason)
          this.reasons.splice(index, 1)

        }
        catch (err) {
          console.error(err)
        }
      },
    },
  }
</script>
