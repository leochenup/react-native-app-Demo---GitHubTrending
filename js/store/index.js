import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer/index'


/**
 * 中间件：先依次执行所有中间件的 1, 2 层函数，然后再去执行reducer，然后再依次执行所有中间件的第三层函数(传递action作为参数)
 * @param {*} store 
 */
const logger = store => {
    return next => { //传递next 参数 让内层函数执行完成后，可以调用next方法执行下一个中间价的内层函数
        return action => {
            //reducer执行完成后
            if (typeof action === 'function') {
                // console.log('dispatching a functoin ')
            } else {
                // console.log('dispatching', action)
            }
            const result = next(action)
            // console.log('nextState',store.getState())
            return result
        }
    }
}


const middlewares = [
    logger,
    thunk,

]

/**
 * 创建 stroe
 */
const store = createStore(reducer, applyMiddleware(...middlewares))

export default store