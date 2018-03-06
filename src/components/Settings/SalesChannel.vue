<template>
  <div class="content sahito-user bgr-white">
    <div id="sales_channel">
      <div class="container full-width-header bttop-1 pt-pb-10 m-b-20">
        <div class="row">
          <div class="col-md-12">
            <h4 class="pull-left page-title">Sales Channel Settings</h4>
          </div>
        </div>
      </div>
      <div class="container setting-page-right-content">
        <div class="row">
          <div class="col-md-12">
            <div class="form-horizontal p-10">
              <div class="form-group">
                <div class="col-md-4">
                  <select v-model="form.sales_channel_id" class="form-control">
                    <option
                      v-for="channel in list.channel_resources"
                      :value="channel.id"
                    >
                      {{ channel.channel_name }}
                    </option>
                  </select>
                </div>

                <div class="col-md-7">
                  <input
                    v-model="form.store_name"
                    type="text"
                    class="form-control form-white"
                    id="sales_channel_name"
                    placeholder="Sales Channel Name"
                  />
                </div>
                <div class="col-md-1">
                  <button @click="add" type="button" class="btn btn-info waves-effect waves-light">Add</button>
                </div>
              </div>
            </div>

            <div class="alert alert-info2">
              If your favorite channel is not found in our list, please <a
              href="https://zuragan.com#contact">contact us</a> anytime. We will add it later.
            </div>

            <div class="table-responsive">
              <table class="table table-bank">
                <colgroup>
                  <col width="20%">
                  <col width="15%">
                  <col width="65%">
                  <col width="10%">
                </colgroup>
                <thead>
                <tr>
                  <th></th>
                  <th>Channel</th>
                  <th>Store Name</th>
                  <th colspan="2"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="channel in list.channels">
                  <td class="has_img">
                    <img v-if="channel.sales_channel.channel_name == 'Offline Store' || channel.sales_channel.channel_name == 'Website' || channel.sales_channel.channel_name == 'Bazaar' " :src="image_logo_medium">
                    <img v-else-if="channel.sales_channel.channel_name == 'SMS'">
                    <img v-else :src="`/static/images/sales-channel/${channel.sales_channel.channel_name.toLowerCase()}.png`">
                  </td>
                  <td>{{ channel.sales_channel.channel_name }}</td>
                  <td>{{ channel.store_name }}</td>
                  <td>
                    <!-- <div v-if="channel.sales_channel.channel_name.toLowerCase() === 'lazada'">
                      <button class="btn btn-default waves-effect" @click="syncModalToggle">Syncronize to Lazada</button>
                    </div> -->
                  </td>
                  <td>
                    <button @click="remove(channel)" type="button" class="btn btn-default waves-effect">
                      <i class="ion-trash-b"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sync modal -->
    <SalesChannelModal
      v-if="ui.showSyncModal"
      :show="ui.showSyncModal"
      @close="ui.showSyncModal = false"
    ></SalesChannelModal>

  </div>
</template>

<script>
  import Axios from 'axios'
  import Cookie from 'js-cookie'
  import Form from '@/helpers/Form'
  import SalesChannelModal from './SalesChannelModal'

  const orgId = Cookie.get('organization_id')

  export default {
    name: 'SalesChannel',

    components: {
      SalesChannelModal,
    },

    data () {
      return {
        ui: {
          showSyncModal: false,
        },
        list: {
          channel_resources: [],
          channels: [],
        },
        form: new Form({
          sales_channel_id: null,
          store_name: '',
        }),
      }
    },

    mounted () {
      this.salesChannelResource()
      this.salesChannel()
      this.companyLogo()
    },

    methods: {

      async salesChannelResource () {
        const res = await Axios.get(`my_channels/create`)
        const channel_resources = res.data.data.channels
        const sortedData = _.sortBy(channel_resources, ['channel_name'])
          /*.filter(channel => channel.channel_name !== 'Lazada')*/
        this.list.channel_resources = sortedData
      },

      async salesChannel (params = {}) {
        const defaultParams = {
          filter: 'all',
          page: 1,
          per_page: 9999,
          sort: 'sales_channel_id.asc',
        }

        const query = Object.assign({}, defaultParams, params)

        const res = await Axios.get(`my_channels`, {params: query})
        this.list.channels = res.data.data
      },

      async companyLogo (){
        const organization_id = Cookie.get('organization_id')
        const res = await Axios.get(`organizations/${organization_id}`)
        this.image_logo_medium = res.data.data.logo
      },

      async add () {
        try {
          const res = await Axios.post(`my_channels`, this.form)
          await this.salesChannel()
          this.form.sales_channel_id = null
          this.form.store_name = ''
          Alert.success('New channel has been created')
        }
        catch (err) {
          console.error(err)
          Alert.error('Whoops')
        }
      },

      async remove (channel) {
        try {
          Alert.confirm({text: 'Are you sure?'}, async () => {
            const res = await Axios.delete(`my_channels/${channel.id}`)

            const index = this.list.channels.indexOf(channel)
            this.list.channels.splice(index, 1)

            Alert.success('Channel has been deleted')
          })
        }
        catch (err) {
          console.error(err)
        }
      },

      async syncModalToggle() {
        this.ui.showSyncModal = ! this.ui.showSyncModal
      },

    },
  }
</script>
