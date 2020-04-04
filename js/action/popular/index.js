import Types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData, _projectModels } from '../ActionUtil'


//异步action


export const onLoadPopularData = (storeName, url, pageSize, favoriteDao) => {
    return async dispatch => {
        //进入加载状态...
        dispatch({
            type: Types.POPULAR_DROPDOWN_REFRESH,
            storeName: storeName
        })
        //加载数据...
        let dataStore = new DataStore()
        try {
            let data = await dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            handleData(Types.POPULAR_DROPDOWN_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao)
        } catch (error) {
            console.log(error.message)
            dispatch({ //失败
                type: Types.POPULAR_DROPDOWN_REFRESH_FAIL,
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
export const onLoadMorePopularData = (storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) => {
    return (dispatch) => {
        setTimeout(() => { //模拟网络请求
            if ((pageIndex - 1) * pageSize > dataArray.length) {//加载完全部数据
                if (typeof callback === 'function') {
                    callback('没有更多了')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: '没有更多了',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    // projectModes: dataArray
                })
            } else { //还有数据的情况下
                //得出最后一条数据的index
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex

                _projectModels(dataArray.slice(0, max), favoriteDao, projectModes => {
                    dispatch({
                        type: Types.POPULAR_DROPDOWN_REFRESH_SUCCESS,
                        storeName: storeName,
                        pageIndex: pageIndex,
                        projectModes: projectModes
                    })
                });
            }
        }, 500)
    }
}