<template>
  <div class="content-page-full p-0">
    <div class="content full-width sahito-user bgr-white page-wrapper">
       <div class="container">
        <div class="row" style="padding: 5px 0;">
          <div class="clearfix">
            <div class="pull-left col-md-2 p-0 left-header">
              <div class="form-horizontal">
                <div class="form-group form-general">
                <h3 class="col-md-4 control-label text-left p-0 head-report">Report</h3>
                <div class="col-md-8 p-0">
                <select v-model="reportType" class="form-control report-type-chooser">
                  <option value="customer">by Customer</option>
                  <option value="item">by Items</option>
                </select>
              </div>
              </div>
              </div>
            </div>
              <div class="pull-right col-md-9 p-0 wrapper-form">
                <div class="pull-right col-md-2">
                  <div class="form-horizontal">
                    <div class="form-group form-general">
                      <!-- <label class="col-md-4 control-label text-right pr-0">Date Range</label> -->
                        <div class="col-md-12 chooser-wrapper-wrapper">
                          <select v-model="dateRangeChooser" class="form-control chooser-wrapper" @change="changerangedate()">
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                            <option value="year">This Year</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>
                    </div>
                 </div>
                </div>
                <div v-if="this.dateRangeChooser==='custom'" class="pull-right col-md-4 date-wrapper">
                  <div class="form-horizontal">
                  <div class="form-group form-general">
                    <label class="col-md-4 control-label text-right pr-0">End Range</label>
                    <div class="col-md-8">
                       <input id="end_date" v-model="end_date" class="flatpickr" title="End date" style="padding: 5px 10px;">
                       <!--<button @click="submit" class="btn btn-primary"><i class="fa fa-send"></i> Submit</button>-->
                    </div>
                  </div>
                </div>
                </div>
                <div v-if="this.dateRangeChooser==='custom'" class="pull-right col-md-4 date-wrapper">
                  <div class="form-horizontal">
                  <div class="form-group form-general">
                    <label class="col-md-4 control-label text-right pr-0">Start Date</label>
                    <div class="col-md-8">
                      <input id="start_date" v-model="start_date" class="flatpickr" title="Start date" style="padding: 5px 10px;">
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 p-0 text-center">
          <span ><h4>{COMPANY NAME}</h4></span>
          <span v-if="reportType==='customer'"><h2 class="report-title">Sales by Customer</h2></span>
          <span v-if="reportType==='item'"><h2 class="report-title">Sales by Items</h2></span>
          <span v-if="dateRangeChooser==='today'">Today Sales - {{start_date | date('short')}}</span>
          <span v-else>From {{start_date | date('short')}} To {{end_date | date('short')}}</span>
        </div>
      </div>
      <div class="row">
        <div v-if="reportType==='customer'" class="col-md-12">
          <contacts :start_date="start_date" :end_date="end_date"></contacts>
        </div>
        <div v-if="reportType==='item'" class="col-md-12">
          <items :start_date="start_date" :end_date="end_date"></items>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import Flatpickr from "flatpickr";
import MonthlyReport from "./MonthlyReport";
import Contacts from "./Contacts";
import Items from "./Items";
import start_of_month from "date-fns/start_of_month";
import end_of_month from "date-fns/end_of_month";
import start_of_quarter from "date-fns/start_of_quarter";
import end_of_quarter from "date-fns/end_of_quarter";
import start_of_week from "date-fns/start_of_week";
import end_of_week from "date-fns/end_of_week";
import start_of_year from "date-fns/start_of_year";
import end_of_year from "date-fns/end_of_year";
import date_format from "date-fns/format";

export default {
  name: "Report",

  components: { MonthlyReport, Contacts, Items },

  data() {
    return {
      dateRangeChooser: "month",
      reportType:"item",
      start_date: date_format(start_of_month(new Date()), "YYYY-MM-DD"),
      end_date: date_format(end_of_month(new Date()), "YYYY-MM-DD")
    };
  },

  mounted() {
    $("#start_date").flatpickr({});
    $("#end_date").flatpickr({});
  },

  methods: {
    submit() {
      //
    },
    changerangedate() {
      switch (this.dateRangeChooser) {
        case "today":
          this.start_date = date_format(new Date(), "YYYY-MM-DD");
          this.end_date = date_format(new Date(), "YYYY-MM-DD");
          break;
        case "week":
          this.start_date = date_format(
            start_of_week(new Date()),
            "YYYY-MM-DD"
          );
          this.end_date = date_format(end_of_week(new Date()), "YYYY-MM-DD");
          break;
        case "month":
          this.start_date = date_format(
            start_of_month(new Date()),
            "YYYY-MM-DD"
          );
          this.end_date = date_format(end_of_month(new Date()), "YYYY-MM-DD");
          break;
        case "quarter":
          this.start_date = date_format(
            start_of_quarter(new Date()),
            "YYYY-MM-DD"
          );
          this.end_date = date_format(end_of_quarter(new Date()), "YYYY-MM-DD");
          break;
        case "year":
          this.start_date = date_format(
            start_of_year(new Date()),
            "YYYY-MM-DD"
          );
          this.end_date = date_format(end_of_year(new Date()), "YYYY-MM-DD");
          break;
        case "custom":
          break;
      }
    }
  }
};
</script>
 <style scoped lang="scss">
 .chooser-wrapper-wrapper{
   padding-right: 0px
 }
.chooser-wrapper {
  margin-top:8px;
  padding-left: 0px;
  padding-right: 0px;
}
.date-wrapper {
  margin-top:8px;
  padding-left: 0px;
  padding-right: 0px;
}
.header-report{
  margin:0px
}

.report-type-chooser{
  margin-top:9px;
  padding:0px;
  background-color: transparent;
  border: hidden;
  font-size:24px;
  cursor: pointer;
  option{
    font-size:14px
  }
}
.head-report{
  margin-top:2px;
  width: 75px
}
.left-header{
  left:10px;
  width: 240px
}
.wrapper-form{
  margin-right:30px
}
.report-title{
  margin-top:0px
}
</style>
 