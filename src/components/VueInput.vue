<template>
  <div>
    <div style="position: relative;">
      <input type="text" v-model="q" autocomplete="off" autofocus name="q" title="Type to search">
      <span class="clear" @click="clearText">&times;</span>
    </div>
    <div class="result">
      <ul>
        <li v-for="(option, index) in filteredOptions"
            :data-index="index"
            :data-value="stringify(option)"
            :class="{ active: index === selectedIndex }"
            @click="selectMe($event)"
        >
          {{ option[label] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VueInput',

    data() {
      return {
        q: '',
        isOpen: false,
        options: [],
      }
    },

    computed: {
      filteredOptions() {

      }
    },

    methods: {
      clearText() {
        this.q = ''
      },

      toggle() {
        this.isOpen = !Boolean(this.isOpen)
      }
    }
  }
</script>

<style scoped>
  input {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    border: 1px solid #cecece;
    padding: 4px 25px 4px 8px;
  }

  .clear {
    cursor: pointer;
    font-size: 9px;
    position: absolute;
    bottom: 7px;
    right: 4px;
    padding: 1px 5px;
    background: #eaeaea;
    color: #8a8a8a;
    border-radius: 9999px;
    font-weight: bold;
  }

  .result {
    background: #f9f9f9;
    height: 250px;
  }

  ul {
    padding: 0;
    margin: 0;
  }
</style>
