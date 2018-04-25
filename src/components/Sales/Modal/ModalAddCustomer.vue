<template>
  <div class="modal-add-customer-wrap">
    <button @click="showModalAddCustomer">
      Add New Customer
    </button>
    <div id="modal-add-customer" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <h4 class="modal-title">Add New Contact</h4>

            <form v-on:submit.prevent="save">
              <div class="form-new-customer">

                <div class="form-group">
                  <input type="text" name="FullName" id="first_name" placeholder="Full Name" v-model="model.first_name" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('first_name') }">
                  <span v-show="errors.has('first_name')" class="text-danger">{{ errors.first('first_name') }}</span>
                </div>

                <div class="form-group">
                  <input type="email" name="email"  id="formEmail" placeholder="Email" v-model="model.email" v-validate="'required|email'" v-bind:class="{'form-control': true, 'error': errors.has('email') }">
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>

                <div class="form-group">
                  <input type="text" name="phone"  id="formPhone" placeholder="Phone Number" v-model="model.phone" v-validate="'required|numeric|min:7|max:16'" v-bind:class="{'form-control': true, 'error': errors.has('phone') }">
                  <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
                </div>

                <div class="form-group">
                  <input type="text" name="company_name"  placeholder="Company Name" id="company_name" v-model="model.company_name" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('company_name') }">
                  <span v-show="errors.has('company_name')" class="text-danger">{{ errors.first('company_name') }}</span>
                </div>

                <div class="form-group">
                  <textarea name="address" placeholder="Address" id="formaddress" class="form-control" rows="3" v-model="model.address" v-validate="'required|max:50|min:3'" v-bind:class="{'form-control': true, 'error': errors.has('address') }"></textarea>
                  <span v-show="errors.has('address')" class="text-danger">{{ errors.first('address') }}</span>
                </div>
              </div>
              <button  :disabled="errors.any()" type="submit" class="btn btn-info waves-effect waves-light m-t-15">Save</button>
              <button type="reset" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate);

  export default {
    name: 'ModalAddCustomer',
    computed: {
      displayName(){
        return this.model.first_name+' '+this.model.company_name
      }
    },

    created(){
    },

    data() {
      return {
        model: {
          name:'',
          first_name:'',
          company_name:'',
          billing_address: '',
          phone: '',
          email: '',
          is_customer:'true', // hidden
          display_code:1,
          contact_status:1,
          is_sameAddress:true,
        }
      }
    },
    mounted() {
        // $('#modal-add-customer').modal('show')
    },
    methods: {
      showModalAddCustomer(){
        $('#modal-add-customer').modal('show')
      },
      getCarriers() {
        store.dispatch('sales/shipment/getCarriers')
      },

      save() {
        let url = '/contacts';

        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log(result)
            // eslint-disable-next-line
            // alert('Form is valid!');
            try{
              axios.post(`/contacts`, {...this.model,
              display_name: this.displayName
              }).then(res => {
                swal_success(res)
                this.$emit('close')
              }).catch(err => {
                swal_error(err.response)
              })
            }catch (err) {
              err =>{
                console.log(err.response)
              }
            }
            return;
          }else{
            Alert.error('Customer form is not valid!');
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  textarea {
    resize: none;
  }
</style>
