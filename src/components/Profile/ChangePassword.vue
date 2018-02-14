<template>
  <div class="tab-pane active" id="change-pass">
    <div class="row sahito-profile-tabs--password">
      <div class="col-md-12">
        <div class="panel panel-default panel-fill" style="margin-bottom: 0px">
          <div class="panel-heading">
            <h3 class="panel-title">Password</h3>
            <small class="help-block">
              Update your account password. Always set a strong password, which helps to prevent unathorized access to
              your account.
            </small>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-12 sahito-personal-tabs-personal--content">
                <form @submit.prevent method="POST" action="#" class="form-horizontal">
                  <div class="form-group">
                    <label for="current_pass" class="col-sm-3 control-label">Current Password</label>
                    <div class="col-sm-6">
                      <input type="password"
                             class="form-control form-trans"
                             id="current_pass"
                             v-model="passwords.current_pass"
                             required
                             placeholder="Enter your current password"
                      />
                      <div class="alert alert-warning" v-show="invalidCurrentPassword">
                        Current password is required.
                      </div>
                      <!-- <div class="alert alert-warning" v-show="validations.empty.current_pass">
                        Please provide your current password
                      </div> -->
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="new_pass" class="col-sm-3 control-label">New Password</label>
                    <div class="col-sm-6">
                      <input type="password"
                             class="form-control form-trans"
                             id="new_pass"
                             v-model="passwords.new_pass"
                             required
                             placeholder="Enter your new password"
                      />
                      <!-- <div class="alert alert-warning" v-show="validations.empty.new_pass">
                        Please provide new password
                      </div> -->
                      <div class="alert alert-warning" v-show="invalidNewPassword">
                        Passwords must have at least 8 characters
                      </div>
                      <!-- <div class="alert alert-warning" v-show="validations.min.new_pass">
                        Minimum password characters is 8.
                      </div> -->
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="reenter_pass" class="col-sm-3 control-label">Re-enter Password</label>
                    <div class="col-sm-6">
                      <input type="password"
                             class="form-control form-trans"
                             id="reenter_pass"
                             v-model="passwords.reenter_pass"
                             required
                             placeholder="Confirm your password"
                      />
                      <!-- <div class="alert alert-warning" v-show="validations.empty.reenter_pass">
                        Please provide password confirmation
                      </div> -->
                      <div class="alert alert-warning" v-show="invalidPasswordConfirmation">
                        New password does not match.
                      </div>
                      <!-- <div class="alert alert-warning" v-show="validations.match.reenter_pass">
                        New password is not match
                      </div> -->
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-6 col-sm-offset-3">
                      <button type="submit"
                              id="submit"
                              class="btn btn-info waves-effect waves-light"
                              @click="save"
                              :disabled="changePasswordButton"
                      >
                        Save
                      </button>

                      <button class="btn btn-default waves-effect"
                              type="reset"
                              @click="reset"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {responseOk, swal_error, swal_success} from "../../helpers";

  export default {
    name: 'ChangePassword',

    data() {
      return {
        passwords: {
          current_pass: '',
          new_pass: '',
          reenter_pass: '',
        },

        validations: {
          empty: {
            current_pass: false,
            new_pass: false,
            reenter_pass: false,
          },
          min: {
            new_pass: false,
          },
          match: {
            reenter_pass: false,
          },
        }
      };
    },

    computed: {
      changePasswordButton() {
        if (this.invalidCurrentPassword || this.invalidNewPassword || this.invalidPasswordConfirmation) {
          return true;
        }
        return false;
      },
      invalidCurrentPassword() {
        if (!this.passwords.current_pass) {
          return true;
        }
        return false;
      },
      invalidNewPassword() {
        if (this.passwords.new_pass.length < 8) {
          return true;
        }
        return false;
      },
      invalidPasswordConfirmation() {
        if (this.passwords.new_pass != this.passwords.reenter_pass) {
          return true;
        }
        return false;
      }
    },

    methods: {

      async save() {
        if (!this.validatePasswords()) {
          return false;
        }

        const payload = {
          old_password: this.passwords.current_pass,
          password: this.passwords.new_pass,
          password_confirmation: this.passwords.reenter_pass,
        };

        try {
          const res = await axios.post('profile/change_password', payload)
          if (!responseOk(res.data.code)) return swal_error(res)

          swal_success(res)
          this.reset()

        } catch(err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            swal_error(err.response);
          }
        }

      },

      reset() {
        this.passwords.current_pass = this.passwords.new_pass = this.passwords.reenter_pass = '';
      },

      isAllPasswordsFilled() {
        let foundEmpty = false;

        _.each(this.passwords, (val, key) => {
          if (_.isEmpty(val)) {
            this.validations.empty[key] = true;
            foundEmpty = true;
          }
        });

        if (foundEmpty) {
          return false;
        }
        return true;
      },

      isValidLength(minCharsLength = 8) {
        if (this.passwords.new_pass.length >= minCharsLength) {
          this.validations.min.new_pass = false;
          return true;
        }
        this.validations.min.new_pass = true;
        return false;
      },

      isNewPasswordConfirmed() {
        if (this.passwords.new_pass === this.passwords.reenter_pass) {
          this.validations.match.reenter_pass = false;
          return true;
        }
        this.validations.match.reenter_pass = true;
        return false;
      },

      validatePasswords() {
        let noErrors = true;
        noErrors = this.isAllPasswordsFilled();
        noErrors = this.isValidLength();
        noErrors = this.isNewPasswordConfirmed();

        if (noErrors) {
          return true;
        }
        return false;
      },
    },
  };
</script>
