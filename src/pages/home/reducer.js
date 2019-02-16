import { fromJS } from 'immutable'
import { SET_LIST } from './actionTypes'

const defaultState = fromJS({
  dayNews: [],
  dayNewsPage: 1,

  reports: [],
  reportsPage: 1,

  comments: [],
  commentsPage: 1,
  
  stydies: [],
  stydiesPage: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {

    // 修改每个列表
    case SET_LIST:
      let list = fromJS(action.value)
      switch (action.listType) {
        case 'daily-report':
          return state.merge({
            page: action.page,
            dayNews: list
          })
        case 'hot-report':
          return state.merge({
            page: action.page,
            reports: list
          })
        case 'hot-comment':
          return state.merge({
            page: action.page,
            comments: list
          })
        case 'yanjiu':
          return state.merge({
            page: action.page,
            stydies: list
          })
      }

    default: 
      return state
  }
}
