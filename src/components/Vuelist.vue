<template>
  <div class="vuelist">

    <div class="main" @click="toggle" :class="{ 'text-muted': selected === placeholder }">
      {{ selected }}
      <span class="pull-right ion-ios7-arrow-up" style="font-size:20px" v-show="isOpen"></span>
      <span class="pull-right ion-ios7-arrow-down" style="font-size:20px" v-show="!isOpen"></span>
    </div>

    <div class="list" v-show="isOpen">

      <input
        type="text"
        ref="text_filter"
        placeholder="Search..."
        v-model.trim="search"
        @keyup="doSearch"
        @keyup.esc="clearOrClose"
        @keydown.enter.prevent=""
      />

      <span class="indicator" v-show="isCalculating"> {{ searchIndicator }} </span>
      <div class="d-flex text-center" v-if="loading">
        <SpinnerSmall></SpinnerSmall>
      </div>
      <ul v-if="!loading">
        <li v-for="(option, index) in filteredOptions"
            :data-index="index"
            :data-value="stringify(option)"
            :class="{ active: index === selectedIndex }"
            @click="selectMe($event)"
        >
          {{ option[label] }}
        </li>
      </ul>

      <div v-show="!filteredOptions.length" class="no-data">
        {{ nodata }}
      </div>

    </div><!-- \.list -->

  </div>
</template>

<script>

  import { debounce } from 'lodash'

  export default {

    name: 'Vuelist',

    components: {
      SpinnerSmall: () => import('@/components/Helpers/SpinnerSmall'),
    },

    // filters: {
    //   stringify(object) {
    //     return JSON.stringify(object, null, 2);
    //   },
    // },

    props: {
      loading:{
        type: Boolean,
        default: false
      },

      debounce: {
        type: Number,
        default: 500,
      },

      autoclose: {
        type: Boolean,
        default: true,
      },

      open: {
        type: Boolean,
        default: false
      },

      placeholder: {
        type: String,
        default : '',
      },

      options: {
        type: Array,
        default: () => {
          return [];
        },
      },

      label: {
        type: String,
        default: 'label'
      },

      nodata: {
        type: String,
        default: 'No data'
      },

      keyid: {
        type: String,
        default: 'value'
      },

      value: {
        type: [ String, Number, Boolean, Object, Array ],
        default: null
      }

    },


    watch: {
      open(val) {
        this.isOpen = val;
      },


      value(val) {
        if (val) {
          for (let [index, option] of this.options.entries()) {
            if (option[this.keyid] === val) {
              this.currentValue = option
              this.selectedIndex = index
              this.$emit('change', _.cloneDeep(this.currentValue));
              break
            }
          }
        } else {
          this.currentValue = null
          this.selectedIndex = null
          this.$emit('cleared');
        }
      },


      options(val) {
        this.options = val;
        this.currentValue = null;
        this.selectedIndex = null;
      },


      searchQuery() {
        this.searchQueryIsDirty = true
        this.doSearch()
      }


    },


    data() {
      return {
        search: '',
        searchQueryIsDirty: false,
        isCalculating: false,
        isOpen: false,
        selectedIndex: null,
        currentValue: null,
      }
    },


    computed: {

      selected() {
        return this.currentValue ? this.currentValue[this.label] : this.placeholder;
      },


      filteredOptions() {
        return this.options.filter(item => {
          if (item[this.label]) {
            return item[this.label].toString().toLowerCase().indexOf(this.search) > -1
          }
        })
      },

      /**
       * Search indicator
       */
      searchIndicator() {
        if (this.isCalculating) {
          return '⟳ Fetching new results'
        } else if (this.searchQueryIsDirty) {
          return '... Typing'
        } else {
          return '✓ Done'
        }
      }

    },


    methods: {

      stringify(object) {
        return JSON.stringify(object, null, 2);
      },

      /**
       * Clear the input if exists, then close the list.
       */
      clearOrClose() {
        if (this.search) {
          return this.search = '';
        }

        this.close();
      },


      /**
       * Close the list
       */
      close() {
        this.isOpen = false;
      },


      /**
       * Open/close list toggle
       */
      toggle() {
        this.isOpen = ! this.isOpen;
        // this.$refs.text_filter.focus();
        this.$nextTick(() => {
          // this.$refs.text_filter.focus();
        });
      },


      /**
       * When select the item from list
       */
      selectMe($event) {

        this.selectedIndex = parseInt($event.target.dataset.index);
        this.currentValue = JSON.parse($event.target.dataset.value);

        this.search = ''
        this.isOpen = !this.autoclose;

        this.$emit('change', _.cloneDeep(this.currentValue));
      },


      /**
       * Do search
       */
      doSearch: _.debounce(function () {
        this.isCalculating = true
        setTimeout(function () {
          this.isCalculating = false
          this.searchQueryIsDirty = false
          this.$emit('search', this.search)
        }.bind(this), 1000)
      }, 500)

    }

  }
</script>

<style scoped>
.vuelist{
  position: relative;
}

.list {
  position: absolute;
  width: 100%;
  z-index: 10;
  background: white;
  border: 1px solid #cecece;
  border-top: none;
  padding: 4px;
  box-shadow: #999 0 1px 1px 0px;
}

.main {
  padding: 8px 8px;
  border: 1px solid #cecece;
  background-color: #fefefe;

  position: relative;
  cursor: default;

  /* Disable selection text */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} 

.arrow {
  position: absolute;
  top: 16px;
  right: 10px;
}

.arrow-up {
  border-top: 0 solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #888;
  border-left: 5px solid transparent;
}

.arrow-down {
  border-top: 5px solid #888;
  border-right: 5px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 5px solid transparent;
}

input[type="text"] {
  box-sizing: border-box;
  padding: 6px;
  border: 1px solid #cecece;
  width: 100%;
}

input:focus {
  outline: none;
}

ul {
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow: auto;
}

ul li {
  background-color: #f0f0f0;
  padding: 4px 8px;
  list-style: none;

  /* Disable selection text */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

ul li:hover,
ul li.active:hover {
  background: #ddd;
  cursor: default;
}

ul li.active {
  background: #d0d0d0;
}

.no-data {
  padding: 4px;
  color: #818a91;

  /* Disable selection text */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.indicator {
  color: #cecece;
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 10px;
  background: white;
}
</style>
