export default class NavigationUtil {
    /**
     * 重制到主页面
     * @param {*} params 
     */

    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
}