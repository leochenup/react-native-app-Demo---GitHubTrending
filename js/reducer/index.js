import { combineReducers } from 'redux'
import theme from './theme'
import popular from './popular'
import trending from './trending'

/**
 * 合并 reducer 函数
 */
const index = combineReducers({
    theme,
    popular,
    trending
})

export default index