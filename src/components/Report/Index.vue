<template>
  <div class="container">

    <div class="row" style="padding: 5px 0;">
      <div class="clearfix">
        <div class="pull-left">
          <h3>Report</h3>
        </div>
        <div class="pull-right">
          <label>Start date</label>
          <input id="start_date" v-model="start_date" class="flatpickr" title="Start date" style="padding: 5px 10px;">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label>End date</label>
          <input id="end_date" v-model="end_date" class="flatpickr" title="End date" style="padding: 5px 10px;">
          <!--<button @click="submit" class="btn btn-primary"><i class="fa fa-send"></i> Submit</button>-->
        </div>
      </div>
    </div>

    <div class="row">
      <monthly-report :start_date="start_date" :end_date="end_date"></monthly-report>
    </div>

    <div class="row">
      <div class="col-md-6">
        <contacts :start_date="start_date" :end_date="end_date"></contacts>
      </div>
      <div class="col-md-6">
        <items :start_date="start_date" :end_date="end_date"></items>
      </div>
    </div>

  </div>
</template>

<script>
  import Flatpickr from "flatpickr";
  import MonthlyReport from "./MonthlyReport";
  import Contacts from "./Contacts";
  import Items from "./Items";
  import start_of_month from 'date-fns/start_of_month'
  import end_of_month from 'date-fns/end_of_month'
  import date_format from 'date-fns/format'

  export default {
    name: 'Report',

    components: {MonthlyReport, Contacts, Items},

    data() {
      return {
        start_date: date_format(start_of_month(new Date()), 'YYYY-MM-DD'),
        end_date: date_format(end_of_month(new Date()), 'YYYY-MM-DD'),
      }
    },

    mounted() {
      $('#start_date').flatpickr({
      });
      $('#end_date').flatpickr({
      });
    },


    methods: {
      submit() {
        //
      }
    }
  }
</script>
