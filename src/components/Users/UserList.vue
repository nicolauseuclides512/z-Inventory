<template>
<div>
  <div>
    <div class="content sahito-user">
      <div class="container">

        <div class="row">
          <div class="col-sm-12">
            <h4 class="pull-left page-title">Users</h4>
            <div class="pull-right">
              <button class="btn btn-info waves-effect waves-light m-b-5" data-toggle="modal" data-target="#invite-users">
                <span>Invite new user</span> <i class="ion-plus"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="row sahito-list-user">
          <div class="col-md-12">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">List of Users</h3>
              </div>
              <div class="panel-body">
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="sahito-list-user--table">
                      <table class="table"
                             v-infinite-scroll="loadMore()"
                             infinite-scroll-disabled="busy"
                             infinite-scroll-distance="200">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Verified at</th>
                            <th>Primary</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user in users">
                            <td>
                              <img src="/static/images/users/avatar-1.jpg" alt="" class="img-circle img-responsive">
                              <span class="sahito-list-user--name">
                                <h4>{{ user.name }}</h4>
                                <h6 class="user-status green">
                                ({{ userStatus(user) }})
                                </h6>
                                <p>{{ user.email }}</p>
                              </span>
                            </td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.verified_at }}</td>
                            <td>{{ user.is_primary }}</td>
                            <td>
                              <div class="btn-group">
                                <button type="button" class="btn btn-default dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false"><i class="md md-settings"></i> <span class="caret"></span></button>
                                <ul class="dropdown-menu" role="menu">
                                  <li><a href="javascript:void(0);" @click="editUser(user)" data-toggle="modal" data-target="#edit-user">Edit</a></li>
                                  <li><a href="javascript:void(0);" @click="markAsActive(user)" v-show="user.user_status == 0" >Mark as Active</a></li>
                                  <li><a href="javascript:void(0);" @click="markAsInactive(user)" v-show="user.user_status != 0">Mark as Inactive</a></li>
                                  <li><a href="javascript:void(0);" @click="destroy(user)">Delete</a></li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- End row -->

      </div>

    </div>
  </div>

  <div id="edit-user" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">Edit User</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <form action="#" class="form-horizontal">
                <div class="form-group">
                  <label class="col-md-3 control-label">Email</label>
                  <div class="col-md-7">
                    <input v-model="edit.email" type="email" class="form-control form-trans" id="email" placeholder="Enter Email" disabled autocomplete="off">
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-md-3 control-label">Name</label>
                  <div class="col-md-7">
                    <input v-model="edit.full_name" type="text" class="form-control form-trans" id="full_name" placeholder="Enter Name" autocomplete="off">
                  </div>
                </div>
                <div class="form-group">
                  <label for="role" class="col-md-3 control-label">Role</label>
                  <div class="col-md-7">
                    <select id="role" v-model="edit.role" class="form-control form-trans" data-placeholde="Choose Role">
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="saveEdit" id="save" :disabled="editButton" type="button" class="btn btn-info waves-effect waves-light m-t-15">Save</button>
          <button @click="closeEdit" id="cancel" type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <div id="invite-users" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">Invite New User</h4>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <form action="#" class="form-horizontal">
                <div class="form-group">
                  <label for="invite-email" class="col-md-3 control-label">Email</label>
                  <div class="col-md-7">
                    <input v-model="invite.email" type="email" class="form-control form-trans" id="invite-email" placeholder="Enter Email" autocomplete="off">
                    <div class="alert alert-warning" v-show="invalidEmail">Invalid email address</div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="invite-full_name" class="col-md-3 control-label">Name</label>
                  <div class="col-md-7">
                    <input v-model="invite.full_name" type="text" class="form-control form-trans" id="invite-full_name" placeholder="Enter Name" autocomplete="off">
                  </div>
                </div>
                <div class="form-group">
                  <label for="invite-role" class="col-md-3 control-label">Role</label>
                  <div class="col-md-7">
                    <select id="invite-role" v-model="invite.role" class="form-control form-trans" data-placeholde="Choose Role">
                      <option :value="1">Admin</option>
                      <option :value="2">User</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="sendInvitation" id="send-invitation" :disabled="invitationButton" type="button" class="btn btn-info waves-effect waves-light m-t-15">Send invitation</button>
          <button @click="closeInvitation" id="cancel-invitation" type="button" class="btn btn-default waves-effect m-t-15" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import Cookie from 'js-cookie'
  import { responseOk, swal_error, swal_success } from 'helpers'

  const orgId = Cookie.get('organization_id')

  export default {
    name: 'UserList',

    data() {
      return {
        page: 1,
        users: [],
        invite: {
          role: '',
          email: '',
          username: '',
          full_name: '',
        },
        edit: {
          id: null,
          role: '',
          email: '',
          username: '',
          full_name: '',
        },
      };
    },

    mounted() {
      this.getUserList();
    },

    methods: {

      loadMore() {
        this.page = this.page +1;
//        this.getUserList({ page: this.page });
      },

      sendRequest(url, method = 'GET', data = {}) {
        this.$http({
          url: url,
          method: method,
          data: data
        }).then(res => {
          if (res.body.code == 0) {
            swal_success(res);
          } else {
            swal_error(res);
          }
        }, res => {
          swal_error(res);
        });
      },

      getUserList(options) {

        const defaultParams = {
          page: 1,
          sort_column: 'username',
          sort_order: 'asc',
          filter_by: 'status_all',
          q: null,
        }

        const params = Object.assign({}, defaultParams, options)

        axios.get(`organizations/${orgId}/contacts`, { params }).then(res => {
          if (! responseOk(res.data.code)) return swal_error(res)

          this.users = res.data.data

        }).catch(err => swal_error(err.response))
      },

      markAsActive(user) {
        this.$http.post('users/mark_as/active', null, { params: { ids: user.user_id } })
          .then(res => {
            if (res.body.code != 0) return swal_error(res)

            user.user_status = 1

            return swal_success(res)

          }, res => {
            return swal_error(res)
          })
      },

      markAsInactive(user) {
        this.$http.post('users/mark_as/inactive', null, { params: { ids: user.user_id } })
          .then(res => {
            if (res.body.code != 0) return swal_error(res)

            user.user_status = 0
            return swal_success(res);

          }, res => {
            return swal_error(res);
          });
      },

      destroy(user) {
        Alert.confirm({
          title: "Are you sure delete this user?",
          text: "",
        }, () => {
          const url = BASE_URL + '/user/' + user.user_id;

          this.$http.delete(url)
            .then(res => {
              if (res.body.code == 0) {
                swal_success(res);
                const index = this.users.indexOf(user)
                this.users.splice(index, 1)
              } else {
                swal_error(res);
              }
            }, res => {
              swal_error(res);
            });

        });
      },

      sendInvitation() {
        const url = BASE_URL + '/invite';

        const payload = {
          role: this.invite.role,
          email: this.invite.email,
          username: this.invite.email,
          full_name: this.invite.full_name,
        };

        this.$http.post(url, payload)
          .then(res => {
            if (res.body.code == 0) {
              this.invite.role = this.invite.email = this.invite.email = this.invite.full_name = '';
              this.users = []; // Clear to refresh
              this.getUserList();
              swal_success(res);
            } else {
              swal_error(res);
            }
          }, res => {
            swal_error(res);
          });

      },

      closeInvitation() {
        this.invite.role = this.invite.email = this.invite.email = this.invite.full_name = '';
      },

      saveEdit() {
        const payload = {
          role: this.edit.role,
          email: this.edit.email,
          gender: this.edit.gender,
          nickname: this.edit.nickname,
          username: this.edit.username,
          full_name: this.edit.full_name,
        };

        this.$http.post(`users/${this.edit.id}/update`, payload)
          .then(res => {
            if (res.body.code == 0) {
              this.edit.role = this.edit.email = this.edit.email = this.edit.full_name = '';
              $('#edit-user').modal('hide');
              this.users = [];
              this.getUserList();
              swal_success(res);
            } else {
              swal_error(res);
            }
          }, res => {
            swal_error(res);
          });

      },

      editUser(user) {
        this.edit.id = user.user_id;
        this.edit.role = user.role;
        this.edit.email = user.email;
        this.edit.username = user.username;
        this.edit.full_name = user.full_name;
      },

      closeEdit() {
        this.edit.role = this.edit.email = this.edit.email = this.edit.full_name = '';
      },

    },

    computed: {

      userStatus(user) {
        return (user) => {
          if (user.user_status == 0) return 'Inactive';
          if (user.user_status == 1) return 'Active';
          if (user.user_status == 2) return 'Invited';
        };
      },

      invitationButton() {
        if (this.invite.email && this.invite.full_name && this.invite.role && !this.invalidEmail) {
          return false;
        }
        return true;
      },

      editButton() {
        if (this.edit.full_name && this.edit.role) {
          return false;
        }
        return true;
      },

      invalidEmail() {
        let emailRegex = /\S+@\S+\.\S+/;
        if (this.invite.email.match(emailRegex)) {
          return false;
        }
        return true;
      },

    }
  }
</script>
