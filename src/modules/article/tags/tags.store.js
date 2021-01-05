import API from '@/api'
import { DEFAULT_PAGE_LIMIT } from '@/utils/const'

const UPDATE_LIST = 'UPDATE_LIST'
const UPDATE_COUNT = 'UPDATE_COUNT'
const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE'

export default {
  state: {
    list: [],
    total: 0,
    currentPage: 1,
    limit: DEFAULT_PAGE_LIMIT
  },
  mutations: {
    [UPDATE_LIST] (state, data) {
      state.list = data
    },
    [UPDATE_COUNT] (state, total) {
      state.total = total
    },
    [UPDATE_CURRENT_PAGE] (state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async getList ({ commit, state }) {
      try {
        const {data} = await API['article/tags'].getList({
          page: state.currentPage,
          limit: DEFAULT_PAGE_LIMIT
        })
        commit(UPDATE_LIST, data.data)
        commit(UPDATE_COUNT, data.count)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
