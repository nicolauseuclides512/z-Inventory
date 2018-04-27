<template>
  <div class="modal-add-customer-wrap">
    <!-- <button class="btn btn-add-customer btn-block" @click="showModalAddCustomer">
      Add New Customer
    </button> -->
    <div id="modal-add-customer" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-customer-header">
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
                  <input type="email" name="email"  id="formEmail" placeholder="Email" v-model="model.email" v-validate="'email'" v-bind:class="{'form-control': true, 'error': errors.has('email') }">
                  <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
                </div>

                <div class="form-group">
                  <input type="text" name="phone"  id="formPhone" placeholder="Phone Number" v-model="model.phone" v-validate="'numeric|max:15|min:9'" v-bind:class="{'form-control': true, 'error': errors.has('phone') }">
                  <span v-show="errors.has('phone')" class="text-danger">{{ errors.first('phone') }}</span>
                </div>

                <div class="form-group">
                  <input type="text" name="company_name"  placeholder="Company Name" id="company_name" v-model="model.company_name" v-bind:class="{'form-control': true, 'error': errors.has('company_name') }">
                  <span v-show="errors.has('company_name')" class="text-danger">{{ errors.first('company_name') }}</span>
                </div>

                <div class="form-group">
                  <textarea name="address" placeholder="Address" id="formaddress" class="form-control" rows="3" v-model="model.address" v-validate="'max:500|min:3'" v-bind:class="{'form-control': true, 'error': errors.has('address') }"></textarea>
                  <span v-show="errors.has('address')" class="text-danger">{{ errors.first('address') }}</span>
                </div>
              </div>
              <button  :disabled="errors.any() || saving" type="submit" class="btn btn-info waves-effect waves-light m-t-15">
                <span v-if="!saving">Save</span>
                <span v-if="saving">Saving...</span>
                </button>
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
          display_code:1,  // hidden
          contact_status:1, // hidden
          is_sameAddress:true, // hidden
          saving: false
        },
        saving: false
      }
    },
    mounted() {
      $('#modal-add-customer').modal('show')
    },
    methods: {
      hideModalAddCustomer(){
        $('#modal-add-customer').modal('hide')
      },
      showModalAddCustomer(){
        $('#modal-add-customer').modal('show')
      },

      getCarriers() {
        store.dispatch('sales/shipment/getCarriers')
      },

      save() {
        let url = '/contacts';
        this.saving = true;

        this.$validator.validateAll().then((result) => {
          if (result) {
            try{
              axios.post(`/contacts`,
                {
                  ...this.model,
                  display_name: this.displayName
                }
              ).then(res => {
                this.saving = false
                swal_success(res)
                this.hideModalAddCustomer()
                console.log(res.data.data.contact_id)
                this.$emit('fetchContactList')
                this.$emit('selectContact', res.data.data)
                // console.log('alo')
              }).catch(err => {
                this.saving = false
                swal_mapError(err.response)
              })
            }catch (err) {
                this.saving = false
              err =>{
                console.log(err.response)
              }
            }
            return;
          }else{
            this.saving = false
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
  .btn-add-customer{
    width: 95%;
  }
  button.close{
    font-size: 30px;
  }
  h4.modal-title{
    margin-bottom: 24px;
  }
  .modal-customer-header {
    display: block;
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    padding: 20px;
    top: 0;
  }
</style>
