import React, { Component } from 'react'
import NavigationUtil from '../navigators/NavigationUtils'

import DynamicTabNavigator from "../navigators/DynamicTabNavigator";
import { BackHandler } from 'react-native';
import BackPressComponent from '../common/BackPressComponent';
import { NavigationActions } from 'react-navigation';



export default class HomePage extends Component {

    constructor(props) {
        super(props)
        // this.backPress = new BackPressComponent({ backPress: this.onBackPress })
    }

    // componentDidMount() {
    //     this.backPress.componentDidMount()
    // }

    // componentWillUnmount() {
    //     this.backPress.componentWillUnmount()
    // }

    // /**
    //  * 处理Android中的物理返回键
    //  */
    // onBackPress = () => {
    //     const { disptch, nav } = this.props
    //     if (nav.routes[1] === 0) {
    //         return false
    //     }
    //     disptch(NavigationActions.back())
    //     return true
    // }

    render() {
        //修复动态导航器 DynamicTabNavigator 中的页面无法跳转到外层导航。
        NavigationUtil.navigation = this.props.navigation
        return <DynamicTabNavigator />
    }
}