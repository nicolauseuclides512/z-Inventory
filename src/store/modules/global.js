const state = {
  sidebarEnlarged: true,
  showUserMenu: false,
  showSettingMenu: false,
  showSearchMenu: false,
  currentSearchModule: '',
}

const mutations = {
  SIDEBAR_TOGGLE(state) {
    state.sidebarEnlarged = !state.sidebarEnlarged
  },

  userMenuToggle(state, payload) {
    state.showUserMenu = payload == null ? !state.showUserMenu : payload
  },

  settingMenuToggle(state, payload) {
    state.showSettingMenu = payload == null ? !state.showSettingMenu : payload
  },

  searchMenuToggle(state, payload) {
    state.showSearchMenu = payload == null ? !state.showSearchMenu : payload
  },

  changeCurrentSearchModule(state, payload) {
    state.currentSearchModule = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
