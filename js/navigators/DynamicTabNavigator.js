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

import { connect } from 'react-redux'


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
                    name={'whatshot'}
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
                    name={'md-trending-up'}
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
                    name={'favorite'}
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
                    name={'user'}
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
class DynamicTabNavigator extends Component {

    constructor(props) {
        super(props)
        //关闭黄色警告框
        console.disableYellowBox = true
    }

    _tabNavigator = () => {
        if (this.Tabs) {
            return this.Tabs
        }
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage }
        PopularPage.navigationOptions.tabBarLabel = '最热'//动态修改tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: props => {
                return <TabBarComponent theme={this.props.theme} {...props} />
            }
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
    render() {
        return <BottomTabBar
            {...this.props}//传入原有的参数
            activeTintColor={this.props.theme}
        />
    }
}


export default connect(
    state => ({ theme: state.theme.theme })
)(DynamicTabNavigator)
