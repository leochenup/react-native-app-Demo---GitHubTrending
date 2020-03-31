import Types from '../../action/types'

const defaultState = {
}

/**
 * state 树结构
 *
 * popul:{
 *      java:{
 *          items:[],
 *          isloading: false
 *      },
 *
 * }
 */

// dispatch action 后自动执行 reducer
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.TRENDING_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isloading: true,
                    hideLoadingMore: true,
                }
            }
        case Types.TRENDING_REFRESH_SUCCESS: //下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, //原始数据
                    projectModes: action.projectModes, //此次要展示的数据
                    isloading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.TRENDING_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isloading: false,
                    error: action.error
                }
            }
        case Types.TRENDING_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isloading: false,
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.TRENDING_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                    error: action.error
                }
            }
        default:
            return state
    }
}

