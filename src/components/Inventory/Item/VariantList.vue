<template>
  <!--<h5 class="title">Variant</h5>-->
  <table class="table table-bordered">
    <thead>
    <tr>
      <td>Item Name</td>
      <td>SKU</td>
      <td v-if="Object.keys(item.item_attributes)[0]">{{ Object.keys(item.item_attributes)[0] }}</td>
      <td v-if="Object.keys(item.item_attributes)[1]">{{ Object.keys(item.item_attributes)[1] }}</td>
      <td v-if="Object.keys(item.item_attributes)[2]">{{ Object.keys(item.item_attributes)[2] }}</td>
      <td>Track</td>
      <td>Stock</td>
      <td>Price</td>
      <td>Action</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="v in list.items">
      <td>
        <input type="text" class="form-control form-white" v-model="v.item_name" title="" @keydown.prevent.enter>
      </td>
      <td><input type="text" class="form-control form-white" v-model="v.code_sku" title="" @keydown.prevent.enter></td>
      <td v-if="Object.keys(item.item_attributes)[0]">
        <input
          type="text"
          class="form-control form-white"
          title=""
          @keydown.prevent.enter
        />
      </td>
      <td v-if="Object.keys(item.item_attributes)[1]">
        <input
          type="text"
          class="form-control form-white"
          title=""
          @keydown.prevent.enter
        />
      </td>
      <td v-if="Object.keys(item.item_attributes)[2]">
        <input
          type="text"
          class="form-control form-white"
          title=""
          @keydown.prevent.enter
        />
      </td>
      <td align="center">
          <input
          type="checkbox"
          id="track-inventory"
          v-model="v.track_inventory"
          true-value="true"
          false-value="false"
          class="checkbox-primary"
          @keydown.prevent.enter
        />
      </td>
      <td><input type="text" class="form-control form-white" v-model="v.stock_quantity" title="Stock" v-if="v.track_inventory"  @keydown.prevent.enter></td>
      <td><input type="text" class="form-control form-white" v-model="v.sales_rate" title="" @keydown.prevent.enter></td>
      <td>
        <button type="button" @click="updateItem(v)" class="btn btn-info btn-custom waves-effect">
          <i class="fa fa-check"></i>
        </button>
        <button type="button" @click="removeItem(v)" class="btn btn-danger btn-custom waves-effect">
          <i class="ion-trash-b"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import Axios from 'axios'
  import Form from '@/helpers/Form'
  import { responseOk, swal_error, swal_success } from 'src/helpers'

  export default {
    name: 'VariantList',

    props: {
      item: {
        type: Object,
      },
      attributes: {
        type: Array,
      },
    },

    data () {
      return {
        list: {
          items: [],
        },
      }
    },

    async mounted () {
      this.list.items = await this.item.children
    },

    methods: {

      async updateItem (item) {
        try {
          const res = await Axios.post(`items/${item.item_id}/update`, item)
          console.log(_.cloneDeep(res))
          Alert.success(res.data.message)
        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            Alert.error(response.message)
          }
        }
      },

      refreshList() {
        this.list.items = [];
        this.getList({
          currentFilter: this.currentFilter,
          sort: `${this.currentSortColumn}.${this.ascendingSort ? "asc" : "desc"}`
        });
      },

      async removeItem (item) {
        Alert.confirm(
          {
            title: "Do you really want to delete this item variant?",
            text: "The item will be deleted permanently."
          },
          async () => {
            const ids = item.item_id;

            const res = await Axios.delete(`items?ids=${ids}`)
            
            if (!responseOk(res.data.code)) {
              Alert.error('Failed to delete item')
            } else {
              const index = this.list.items.indexOf(item)
              this.list.items.splice(index, 1)

              Alert.success('Item has been deleted')
            }

            // this.$http.delete(`items?ids=${ids}`).then(
            //   res => {
            //     if ([0, 200, 201].indexOf(res.data.code) === -1)
            //     {
            //       return swal_error(res);
            //     } else {
            //       this.$emit('remove', item);
            //       this.mounted();
            //       Alert.success(res.data.message);
            //     }
            //   },
            //   res => {
            //     return swal_error(res);
            //   }
            // );
          }
        );
      },

    },
  }
</script>

<style scoped lang="scss">

</style>
