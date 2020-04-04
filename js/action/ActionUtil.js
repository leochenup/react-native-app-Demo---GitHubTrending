
import ProjectModel from "../model/ProjectModel";
import Utils from "../util/Utils";


export function handleData(actionType, dispatch, storeName, data, pageSize, favoriteDao) {
    let fixItems = []
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data//trending
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items //popular
        }
    }
    //第一次加载的数据
    let showItems = pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize)
    _projectModels(showItems, favoriteDao, projectModes => {
        dispatch({
            type: actionType,
            items: fixItems,
            projectModes: projectModes,
            storeName,
            pageIndex: 1
        })
    });
}

/**
 * 通过本地的收藏状态包装Item
 * @param showItems
 * @param favoriteDao
 * @param callback
 * @returns {Promise<void>}
 * @private
 */
export async function _projectModels(showItems, favoriteDao, callback) {
    let keys = [];
    try {
        //获取收藏的key
        keys = await favoriteDao.getFavoriteKeys();
    } catch (e) {
        console.log('获取收藏的key出错：' + e);
    }
    let projectModels = [];
    for (let i = 0, len = showItems.length; i < len; i++) {
        projectModels.push(new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)));
    }
    doCallBack(callback, projectModels);
}

export const doCallBack = (callBack, object) => {
    if (typeof callBack === 'function') {
        callBack(object);
    }
};