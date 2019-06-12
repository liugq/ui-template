import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_name: '',
    isAsideShow: true,
    icons: { /* *****icons***** */
      edit: 'fas fa-edit',
      delete: 'fas fa-trash-alt',
      cancel: 'fas fa-undo',
      save: 'fas fa-save',
      add: 'fas fa-plus-circle',
      up: 'fas fa-angle-up',
      down: 'fas fa-angle-down',
      left: 'fas fa-angle-left',
      right: 'fas fa-angle-right',
      search: 'fas fa-search',
      list: 'fas fa-th-list',
      ok: 'fas fa-check',
      plus: 'fas fa-plus-circle'
    },
    theme: 'primary', /* *****theme 标识***** */
    themeMap: {
      primary: 'bg-primary text-light',
      secondary: 'bg-secondary text-light',
      success: 'bg-success text-light',
      danger: 'bg-danger text-light',
      warning: 'bg-warning text-light',
      info: 'bg-info text-light',
      light: 'bg-light text-dark',
      white: 'bg-white text-dark',
      dark: 'bg-dark text-light'
    },
    themeMap2: {
      primary: {
        'bg': 'bg-primary',
        'text': 'text-light',
        'border': 'border-primary',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-primary',
        'btn': 'btn btn-primary',
        'editIcon': 'fas fa-edit text-primary',
        'deleteIcon': 'fas fa-trash-alt text-primary',
        'cancelIcon': 'fas fa-undo text-primary',
        'saveIcon': 'fas fa-save text-primary',
        'addIcon': 'fas fa-plus-circle text-primary'
      },
      secondary: {
        'bg': 'bg-secondary',
        'text': 'text-light',
        'border': 'border-secondary',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-secondary',
        'btn': 'btn btn-secondary',
        'editIcon': 'fas fa-edit text-secondary',
        'deleteIcon': 'fas fa-trash-alt text-secondary',
        'cancelIcon': 'fas fa-undo text-secondary',
        'saveIcon': 'fas fa-save text-secondary',
        'addIcon': 'fas fa-plus-circle  text-secondary'
      },
      success: {
        'bg': 'bg-success',
        'text': 'text-light',
        'border': 'border-success',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-success',
        'btn': 'btn btn-success',
        'editIcon': 'fas fa-edit text-success',
        'deleteIcon': 'fas fa-trash-alt text-success',
        'cancelIcon': 'fas fa-undo text-success',
        'saveIcon': 'fas fa-save text-success',
        'addIcon': 'fas fa-plus-circle  text-success'
      },
      danger: {
        'bg': 'bg-danger',
        'text': 'text-light',
        'border': 'border-danger',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-danger',
        'btn': 'btn btn-danger',
        'editIcon': 'fas fa-edit text-danger',
        'deleteIcon': 'fas fa-trash-alt text-danger',
        'cancelIcon': 'fas fa-undo text-danger',
        'saveIcon': 'fas fa-save text-danger',
        'addIcon': 'fas fa-plus-circle  text-danger'
      },
      warning: {
        'bg': 'bg-warning',
        'text': 'text-light',
        'border': 'border-warning',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-warning',
        'btn': 'btn btn-warning',
        'editIcon': 'fas fa-edit text-warning',
        'deleteIcon': 'fas fa-trash-alt text-warning',
        'cancelIcon': 'fas fa-undo text-warning',
        'saveIcon': 'fas fa-save text-warning',
        'addIcon': 'fas fa-plus-circle  text-warning'
      },
      info: {
        'bg': 'bg-info',
        'text': 'text-light',
        'border': 'border-info',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-info',
        'btn': 'btn btn-info',
        'editIcon': 'fas fa-edit text-info',
        'deleteIcon': 'fas fa-trash-alt text-info',
        'cancelIcon': 'fas fa-undo text-info',
        'saveIcon': 'fas fa-save text-info',
        'addIcon': 'fas fa-plus-circle  text-info'
      },
      light: {
        'bg': 'bg-light',
        'text': 'text-dark',
        'border': 'border-light',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-primary',
        'btn': 'btn btn-primary',
        'editIcon': 'fas fa-edit text-primary',
        'deleteIcon': 'fas fa-trash-alt text-primary',
        'cancelIcon': 'fas fa-undo text-primary',
        'saveIcon': 'fas fa-save text-primary',
        'addIcon': 'fas fa-plus-circle  text-primary'
      },
      white: {
        'bg': 'bg-white',
        'text': 'text-dark',
        'border': 'border-white',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-primary',
        'btn': 'btn btn-primary',
        'editIcon': 'fas fa-edit text-primary',
        'deleteIcon': 'fas fa-trash-alt text-primary',
        'cancelIcon': 'fas fa-undo text-primary',
        'saveIcon': 'fas fa-save text-primary',
        'addIcon': 'fas fa-plus-circle  text-primary'
      },
      dark: {
        'bg': 'bg-dark',
        'text': 'text-light',
        'border': 'border-dark',
        'cardOpen': 'fa-angle-up',
        'cardClose': 'fa-angle-down',
        'icon': 'text-dark',
        'btn': 'btn btn-dark',
        'editIcon': 'fas fa-edit text-dark',
        'deleteIcon': 'fas fa-trash-alt text-dark',
        'cancelIcon': 'fas fa-undo text-dark',
        'saveIcon': 'fas fa-save text-dark',
        'addIcon': 'fas fa-plus-circle text-dark'
      }
    },
    loginAccount: {
      username: 'anonym',
      currentRole: {
        roleName: ''
      },
      accountRoleAssigns: []
    },
    selectedLookupType: {
      'lookupTypeId': -1,
      'description': '',
      'lookupTypeName': '',
      'status': -1
    },
    /* loopup */
    statusMap: {
      '1': '有效',
      '-1': '无效'
    },
    yesOrNo: {
      '1': '是',
      '-1': '否'
    }
  },
  getters: {
    user_name: state => state.user_name,
    themes: state => state.themeMap2[state.theme], /* *****themes***** */
    iconsWithTheme: state => { /* *****iconsWithTheme***** */
      return {
        'edit': state.icons.edit + ' ' + state.themeMap2[state.theme].icon,
        'delete': state.icons.delete + ' ' + state.themeMap2[state.theme].icon,
        'cancel': state.icons.cancel + ' ' + state.themeMap2[state.theme].icon,
        'save': state.icons.save + ' ' + state.themeMap2[state.theme].icon,
        'add': state.icons.edit + ' ' + state.themeMap2[state.theme].icon,
        'up': state.icons.up + ' ' + state.themeMap2[state.theme].icon,
        'down': state.icons.down + ' ' + state.themeMap2[state.theme].icon,
        'left': state.icons.left + ' ' + state.themeMap2[state.theme].icon,
        'right': state.icons.right + ' ' + state.themeMap2[state.theme].icon,
        'search': state.icons.search + ' ' + state.themeMap2[state.theme].icon,
        'list': state.icons.list + ' ' + state.themeMap2[state.theme].icon,
        'ok': state.icons.ok + ' ' + state.themeMap2[state.theme].icon,
        'plus': state.icons.plus + ' ' + state.themeMap2[state.theme].icon
      }
    }
  },
  mutations: {
    changeUserName (state, username) {
      state.user_name = username
    },
    changeSelectedLookupType (state, selectedLookupType) {
      state.selectedLookupType = selectedLookupType
    }
    /* login (state, msg) {
          state.username = msg.username
          state.password = msg.password
        } */
  },
  actions: {
    changeSelectedLookupType (context, selectedLookupType) {
      context.commit('changeSelectedLookupType', selectedLookupType)
    }
  }
})
