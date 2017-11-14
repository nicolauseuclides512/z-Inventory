<template>
  <form method="POST" id="form" novalidate>

    <div class="container full-width-header bt-1 p-b-10 m-b-20">
      <div class="row">
        <div class="col-md-12">
          <h4 class="pull-left page-title">Create Item</h4>
        </div>
      </div>
    </div>




    <div class="float-save">
      <div class="container">

        <div class="clearfix">
          <div class="pull-left">
            <button class="btn btn-default waves-effect" type="button" @click="$router.push({name: 'item.index'})">
              <i class="fa fa-chevron-left"></i> Cancel
            </button>
          </div>

          <div class="pull-right">
            <div class="btn-group dropup">
              <button class="btn btn-primary waves-effect waves-light"
                      id="save"
                      @click.prevent="save"
                      data-name="save">Save
              </button>
              <button type="button" id="cancel" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                <span class="caret"></span>
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-right">
                <li><a href="#" id="save-and-new" @click.prevent="save" data-name="save-and-new">Save and New</a></li>
                <li><a href="#" id="save-and-clone" @click.prevent="save" data-name="save-and-clone">Save and Clone</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>

  </form>
</template>

<script>
  export default {
    name: 'Form',

    data () {
      return {
        //
      }
    },

    mounted () {
      //
    },

    methods: {
      //
    },
  }
</script>

<style scoped lang="scss">

</style>
