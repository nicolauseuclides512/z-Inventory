<template>
<div id="app">
  <div class="container">
    <div class="col-md-12">
      <h1 class="title text-center">
        {{title}}
      </h1>

      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <label for="formName">Full Name:</label>
          <input type="text" name="name" id="formName" v-model="formData.name" v-validate="'required'" v-bind:class="{'form-control': true, 'error': errors.has('name') }">
          {{formData.name}}
                    <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="form-group">
          <label for="formEmail">Email:</label>
          <input type="email" name="email"  id="formEmail" v-model="formData.email" v-validate="'required|email'" v-bind:class="{'form-control': true, 'error': errors.has('email') }">
          <span v-show="errors.has('email')" class="text-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="form-group">
          <label for="formfirst_name">first_name:</label>
          <textarea name="first_name" id="formfirst_name" class="form-control" rows="3" v-model="formData.first_name" v-validate="'required|max:50'"></textarea>
          <span v-show="errors.has('first_name')" class="text-danger">{{ errors.first('first_name') }}</span>
        </div>

        <div class="form-group">
          <label for="formGender">Gender:</label>
          <select v-model="formData.gender" name="gender" v-validate="'required'" :class="{'form-control': true, 'error': errors.has('gender')}">
            <option>Female</option>
            <option>Male</option>
          </select>
          <span v-show="errors.has('gender')" class="text-danger">{{ errors.first('gender') }}</span>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" name="subscribe" v-validate="'required'"> Subscribe me, please!
            {{formData.subscribe}}
          </label>
          <span v-show="errors.has('subscribe')" class="text-danger">{{ errors.first('subscribe') }}</span>
        </div>

        <div class="form-group">
          <button class="btn btn-success" :disabled="errors.any()" >Submit {{errors.any()}}</button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

export default {
  name: 'testValidation',

  data: function() {
    return {
      title: 'Vue Vee Validation',
      formData: {
        name: '',
        email: '',
        first_name: '',
        gender: '',
        frameworks: [],
        subscribe: false,
        languages: [],
        happy:'',
        coupon: ''
      }
    }
  },
  created: function() {
  },
  methods: {
    onSubmit: function() {
      this.$validator.validateAll().then(() => {
          console.log('form is valid', this.formData)
      }).catch(() => {
          console.log('errors exist', this.errors)
      });
    }
  }
}
</script>