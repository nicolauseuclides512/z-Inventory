<template>
  <li class="has_sub">
    <a href="javascript:void(0)" class="waves-effect waves-light" @click="showSubMenu">
      <i :class="'md ' + icon"></i>
      <span> {{ title }} </span>
      <span class="pull-right"><i :class="'fa fa-' + expandIcon"></i></span>
    </a>
    <ul class="list-unstyled" :style="displaySubmenu">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  export default {

    name: 'DropdownMenu',

    props: {
      title: '',
      icon: '',
      submenu: [
        { name: '', link: '' },
      ],
    },


    data() {
      return {
        displaySubmenu: { display: 'none' },
        expandIcon: 'chevron-circle-down',
      }
    },


    methods: {

      showSubMenu() {
        if (this.displaySubmenu.display === 'none') {
          this.displaySubmenu.display = 'block'
          this.expandIcon = 'chevron-circle-up'
          return
        }

        this.displaySubmenu.display = 'none'
        this.expandIcon = 'chevron-circle-down'
      }

    }

  }
</script>
