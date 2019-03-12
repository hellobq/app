import { fromJS } from 'immutable'
import { SET_LIST } from './actionTypes'

const defaultState = fromJS({
  listData: {
    'daily-report': [],
    'hot-report': [],
    'hot-comment': [],
    'yanjiu': []
  },

  dayNewsPage: 1,

  reportsPage: 1,

  commentsPage: 1,

  stydiesPage: 1
})

export default (state = defaultState, action) => {
  let value = fromJS(action.value)
  switch (action.type) {
    // 修改每个列表
    case SET_LIST:
      switch (action.listType) {
        case 'daily-report':
          return state
            .merge({
              dayNewsPage: state.get('dayNewsPage') + 1
            })
            .setIn(['listData', 'daily-report'], state.getIn(['listData', 'daily-report']).concat(value))

        case 'hot-report':
          return state.merge({
            reportsPage: state.get('reportsPage') + 1
          }).setIn(['listData', 'hot-report'], state.getIn(['listData', 'hot-report']).concat(value))

        case 'hot-comment':
          return state.merge({
            commentsPage: state.get('commentsPage') + 1
          }).setIn(['listData', 'hot-comment'], state.getIn(['listData', 'hot-comment']).concat(value))
          
        case 'yanjiu':
          return state.merge({
            stydiesPage: state.get('stydiesPage') + 1
          }).setIn(['listData', 'yanjiu'], state.getIn(['listData', 'yanjiu']).concat(value))
      }

    default: 
      return state
  }
}
