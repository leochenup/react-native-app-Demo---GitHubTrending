import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import WelcomePage from '../page/WelcomePage'
import HomePage from '../page/HomePage'
import DetailPage from '../page/DetailPage'
import FetchDemoPage from '../page/FetchDemoPage'
import AsyncstorageDemo from '../page/AsyncstorageDemo'
import DataStoreDemoPage from '../page/DataStoreDemoPage'


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
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null
        }
    },
    FetchDemoPage: {
        screen: FetchDemoPage,
        navigationOptions: {
            // header: null
        }
    },
    AsyncstorageDemo: {
        screen: AsyncstorageDemo,
        navigationOptions: {
            // header: null
        }
    },
    DataStoreDemoPage: {
        screen: DataStoreDemoPage,
        navigationOptions: {
            // header: null
        }
    },
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