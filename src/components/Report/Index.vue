<template>
  <div class="content-page-full">
    <div class="content">
       <div class="container">
        <div class="row" style="padding: 5px 0;">
          <div class="clearfix">
            <div class="pull-left col-md-3">
              <div class="form-horizontal">
                <div class="form-group form-general">
                <h3 class="col-md-4 control-label text-right pr-0">Report</h3>
                <div class="div-col-8">
                <select class="report-type-chooser">
                  <option value="">by Customer</option>
                  <option value="">by Items</option>
                </select>
              </div>
              </div>
              </div>
            </div>
              <div class="pull-right col-md-9 p-0">
                <div class="pull-right col-md-2">
                  <div class="form-horizontal">
                    <div class="form-group form-general">
                      <!-- <label class="col-md-4 control-label text-right pr-0">Date Range</label> -->
                        <div class="col-md-12">
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
                <div v-if="this.dateRangeChooser==='custom'" class="pull-right col-md-3 date-wrapper">
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
      dateRangeChooser: "today",
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
.chooser-wrapper {
  padding-left: 0px;
  padding-right: 0px;
}
.date-wrapper {
  padding-left: 0px;
  padding-right: 0px;
}
.header-report{
  margin:0px
}
.report-type-chooser{
  margin-top:10px;
  padding:0px;
  background-color: transparent;
  border: hidden;
  font-size:24px;
  option{
    font-size:12px
  }

}
</style>
 