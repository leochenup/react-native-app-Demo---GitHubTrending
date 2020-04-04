import Types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData, _projectModels } from '../ActionUtil'

//异步action
export const onLoadTrendingData = (storeName, url, pageSize, favoriteDao) => {
    return async dispatch => {
        //进入加载状态...
        dispatch({
            type: Types.TRENDING_REFRESH,
            storeName: storeName
        })
        //加载数据...
        let dataStore = new DataStore()
        try {
            let data = await dataStore.fetchData(url, FLAG_STORAGE.flag_trending)
            handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao)
        } catch (error) {
            dispatch({ //失败
                type: Types.TRENDING_REFRESH_FAIL,
                error: error.message,
                storeName
            })
        }
    }
}

/**
 * 上拉加载更多
 * @param {*} storeName 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @param {*} dataArray 
 * @param {*} callback 
 */
export const onLoadMoreTrendingData = (storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) => {
    return (dispatch) => {
        setTimeout(() => { //模拟网络请求
            if ((pageIndex - 1) * pageSize > dataArray.length) {//加载完全部数据
                if (typeof callback === 'function') {
                    callback('没有更多了')
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: '没有更多了',
                    storeName: storeName,
                    pageIndex: --pageIndex
                })
            } else { //还有数据的情况下
                //得出最后一条数据的index
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex

                _projectModels(dataArray.slice(0, max), favoriteDao, projectModes => {
                    dispatch({
                        type: Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModes: projectModes
                    })
                });
            }
        }, 500)
    }
}

