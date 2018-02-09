<template>
  <div>
    <form method="POST" @submit.prevent="register">
      <div class="wrapper-page form-horizontal m-t-20">
        <div class="panel panel-color panel-primary panel-pages panel-sign-in">

          <div class="panel-heading">
            <div class="bg-overlay" style="padding-left:15px; padding-top:15px;">
              <div class="zuragan-logo-login">
                <img src="/static/images/zuragan_logo_login.png" height="62" width="125">
              </div>
            </div>
          </div>

          <div class="panel-body">
            <div class="form-group">
              <div class="col-sm-12 text-center">
                <h5>You've already have an account in Zuragan Identity.
                  <br> Just complete this form and we'll help to build your store.</h5>
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  v-model="form.email"
                  ref="email"
                  id="email"
                  type="email"
                  placeholder="Email address"
                  required="required"
                  class="form-control input-lg"
                  disabled="disabled"
                  style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=');"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  v-model="form.organization_name"
                  ref="organization_name"
                  id="organization_name"
                  type="text"
                  placeholder="Organization name"
                  required="required"
                  class="form-control input-lg"
                  style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAAbNJREFUWAntV8FqwkAQnaymUkpChB7tKSfxWCie/Yb+gbdeCqGf0YsQ+hU95QNyDoWCF/HkqdeiIaEUqyZ1ArvodrOHxanQOiCzO28y781skKwFW3scPV1/febP69XqarNeNTB2KGs07U3Ttt/Ozp3bh/u7V7muheQf6ftLUWyYDB5yz1ijuPAub2QRDDunJsdGkAO55KYYjl0OUu1VXOzQZ64Tr+IiPXedGI79bQHdbheCIAD0dUY6gV6vB67rAvo6IxVgWVbFy71KBKkAFaEc2xPQarXA931ot9tyHphiPwpJgSbfe54Hw+EQHMfZ/msVEEURjMfjCjbFeG2dFxPo9/sVOSYzxmAwGIjnTDFRQLMQAjQ5pJAQkCQJ5HlekeERxHEsiE0xUUCzEO9AmqYQhiF0Oh2Yz+ewWCzEY6aYKKBZCAGYs1wuYTabKdNNMWWxnaA4gp3Yry5JBZRlWTXDvaozUgGTyQSyLAP0dbb3DtQlmcan0yngT2ekE9ARc+z4AvC7nauh9iouhpcGamJeX8XF8MaClwaeROWRA7nk+tUnyzGvZrKg0/40gdME/t8EvgG0/NOS6v9NHQAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <input
                  v-model="form.password"
                  ref="password"
                  id="password"
                  type="password"
                  placeholder="Confirm Your Password"
                  required="required"
                  class="form-control input-lg"
                  style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAAbNJREFUWAntV8FqwkAQnaymUkpChB7tKSfxWCie/Yb+gbdeCqGf0YsQ+hU95QNyDoWCF/HkqdeiIaEUqyZ1ArvodrOHxanQOiCzO28y781skKwFW3scPV1/febP69XqarNeNTB2KGs07U3Ttt/Ozp3bh/u7V7muheQf6ftLUWyYDB5yz1ijuPAub2QRDDunJsdGkAO55KYYjl0OUu1VXOzQZ64Tr+IiPXedGI79bQHdbheCIAD0dUY6gV6vB67rAvo6IxVgWVbFy71KBKkAFaEc2xPQarXA931ot9tyHphiPwpJgSbfe54Hw+EQHMfZ/msVEEURjMfjCjbFeG2dFxPo9/sVOSYzxmAwGIjnTDFRQLMQAjQ5pJAQkCQJ5HlekeERxHEsiE0xUUCzEO9AmqYQhiF0Oh2Yz+ewWCzEY6aYKKBZCAGYs1wuYTabKdNNMWWxnaA4gp3Yry5JBZRlWTXDvaozUgGTyQSyLAP0dbb3DtQlmcan0yngT2ekE9ARc+z4AvC7nauh9iouhpcGamJeX8XF8MaClwaeROWRA7nk+tUnyzGvZrKg0/40gdME/t8EvgG0/NOS6v9NHQAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <div class="checkbox checkbox-primary">
                  <input v-model="acceptTerms" ref="acceptTerms" id="accept-terms" required="required" type="checkbox">
                  <label for="accept-terms" class="accept-term-text"> I accept
                    <a href="#">Terms and Conditions</a>
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group text-center m-t-30">
              <div class="col-xs-12">
                <!--<button type="submit" id="submit" class="btn btn-primary waves-effect waves-light btn-lg w-lg">
                    Register
                </button>-->
                <button type="submit" class="btn btn-primary waves-effect waves-light btn-lg m-b-5" id="submit">
                  Register
                </button>
              </div>
            </div>
            <div class="form-group m-t-30">
              <div class="col-sm-12 text-center goto-login">
                <a href="/login">
                  Already have an account?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Axios from 'axios'
  import Form from 'src/helpers/Form'
  import slugify from 'src/helpers/slugify'

  export default {
    name: 'RegisterNewCompany',

    data () {
      return {
        acceptTerms: false,
        form: new Form({
          organization_portal: '',
          organization_name: '',
          email: '',
          password: '',
          application: 'invoice',
        })
      }
    },

    async mounted () {
      this.form.email = this.$route.query.email
      this.form.organization_name = this.$route.query.organization_name
    },

    methods: {
      async register () {
        try {
          this.form.organization_portal = slugify(this.form.organization_name)

          const res = await this.form.post(`register/organization`)

          // There's a lot checker because inconsistency and server returns status code 200
          if (res.data.message.hasOwnProperty('password')) {
            Alert.error(res.data.message.password[0])
            return
          }

          if (res.data.message.hasOwnProperty('email')) {
            Alert.error(res.data.message.email[0])
            return
          }

          if (res.data.message.hasOwnProperty('organization_name')) {
            Alert.error(`Invalid Organization Name`)
            return
          }

          if (res.data.message.hasOwnProperty('organization_portal')) {
            Alert.error(res.data.message.organization_portal[0])
            return
          }

          if (res.data.message === 'wrong input password.') {
            Alert.error(res.data.message)
            return
          }

          if (res.data.message === 'User already registered') {
            Alert.success(res.data.message)
            this.$router.push({name: 'auth.login'})
            return
          }

          if (res.data.code === 200 || res.data.code === 201 || res.data.message === 'organization created.') {
            Alert.success(res.data.message)
            this.$router.push({name: 'auth.login'})
            return
          }

          // Catch all errors
          if (res.data.message !== 'organization created.') {
            console.error(res)
          }

        }
        catch (err) {
          console.error(err)
          if (err.hasOwnProperty('response')) {
            Alert.error(err.response.message)
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">

</style>
