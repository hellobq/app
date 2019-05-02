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

  stydiesPage: 7
})

export default (state = defaultState, action) => {
  let value = fromJS(action.value)
  switch (action.type) {
    // 修改每个列表
    case SET_LIST:
      switch (action.listType) {
        case 'daily-report':
          let oldDailyReport = state.getIn(['listData', 'daily-report']);
          if (oldDailyReport.size >= 80) {
            oldDailyReport = oldDailyReport.splice(0, 40);
          }
          return state
            .merge({
              dayNewsPage: state.get('dayNewsPage') + 1
            })
            .setIn(['listData', 'daily-report'], value)

        case 'hot-report':
          let oldHotReport = state.getIn(['listData', 'hot-report']);
          if (oldHotReport.size >= 80) {
            oldHotReport = oldHotReport.splice(0, 40);
          }
          return state
            .merge({
              reportsPage: state.get('reportsPage') + 1
            })
          .setIn(['listData', 'hot-report'], value)

        case 'hot-comment':
          let oldHotComment = state.getIn(['listData', 'hot-comment']);
          if (oldHotComment.size >= 80) {
            oldHotComment = oldHotComment.splice(0, 40);
          }
          return state
            .merge({
              commentsPage: state.get('commentsPage') + 1
            })
          .setIn(['listData', 'hot-comment'], value)
          
        case 'yanjiu':
          let oldYanjiu = state.getIn(['listData', 'yanjiu']);
          if (oldYanjiu.size >= 80) {
            oldYanjiu = oldYanjiu.splice(0, 40);
          }
          return state
            .merge({
              stydiesPage: state.get('stydiesPage') + 1
            })
          .setIn(['listData', 'yanjiu'], value)
      }

    default: 
      return state
  }
}
