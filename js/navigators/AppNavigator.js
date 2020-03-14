import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'


//初始化
const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null//隐藏头部
        }
    }
})

//主页面
const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    }
})

export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,//初始页面
        Main: MainNavigator //主页面
    },
    {
        navigationOptions: {
            header: null
        }
    }
))