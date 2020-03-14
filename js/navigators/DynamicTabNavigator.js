import React, { Component } from "react";

import FavoritePage from '../page/FavoritePage'
import PopularPage from '../page/PopularPage'
import TrendingPage from '../page/TrendingPage'
import MyPage from '../page/MyPage'

import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'


/**
 * 配置页面的路由
 */

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name='whatshot'
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                    name='md-trending-up'
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({ tintColor, focused }) => (
                <MaterialIcons
                    name='favorite'
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '',
            tabBarIcon: ({ tintColor, focused }) => (
                <Entypo
                    name='user'
                    size={26}
                    style={{ color: tintColor }}
                />
            )
        }
    }
}


/**
 * 动态配置要显示的底部tab
 */
export default class DynamicNavigator extends Component {

    constructor(props) {
        super(props)
        //关闭黄色警告
        console.disableYellowBox = true
    }
    _tabNavigator = () => {
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        PopularPage.navigationOptions.tabBarLabel = '最热'//动态修改tab属性
        return createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: TabBarComponent
        }))
    }

    render() {
        const Tab = this._tabNavigator()
        return <Tab />
    }
}

/**
 * 设置 tabbar 主题颜色样式，
 */
class TabBarComponent extends Component {
    theme = {
        tintColor: this.props.activeTintColor,
        updateTime: new Date().getTime()
    }

    render() {
        console.log(this.props)
        const { routes, index } = this.props.navigation.state
        if (routes[index].params) {
            const { theme } = routes[index].params
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme
            }
        }
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.theme.tintColor || this.props.activeTintColor}
        />
    }
}