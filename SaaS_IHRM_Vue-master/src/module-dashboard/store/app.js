import Cookies from 'js-cookie' // 浏览器端保存信息，在期限内都存在

const app = {
  state: {
    sidebar: {
      // Cookies的值是字符串
      opened: !!+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'zh'
  },
  mutations: {
    // 初始话侧边栏状态
    INIT_SIDEBAR: state => {
      state.sidebar.opened = Cookies.get('sidebarStatus') || 1
      // state.sidebar.opened = false
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    initSidebar({ commit }) {
      commit('INIT_SIDEBAR')
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
