
export function handleData(actionType, dispatch, storeName, data, pageSize) {
    console.log('执行handleData')
    let fixItems = []
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data//trending
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items //popular
        }
    }
    dispatch({ //成功
        type: actionType,
        //第一次加载
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        items: fixItems,
        storeName,
        pageIndex: 1
    })
}