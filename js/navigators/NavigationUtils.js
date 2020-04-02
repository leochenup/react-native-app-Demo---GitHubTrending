export default class NavigationUtil {
    /**
     * 重制到主页面
     * @param {*} params 
     */

    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
    /**
     *  返回上一页
     * @param {*} params 
     */
    static goBack(navigation) {
        navigation.goBack()
    }

    /**
     * 
     * @param  params 要传递的参数 
     * @param  page  要跳转的页面名称（页面路由名称）
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation
        if (!navigation) {
            return console.log('NavigationUtil.navigation can not be null')
        }
        navigation.navigate(page, { ...params })
    }
}