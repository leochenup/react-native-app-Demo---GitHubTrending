import React, { Component } from 'react'
import NavigationUtil from '../navigators/NavigationUtils'

import DynamicTabNavigator from "../navigators/DynamicTabNavigator";



export default class HomePage extends Component {


    render() {
        //修复动态导航器 DynamicTabNavigator 中的页面无法跳转到外层导航。
        NavigationUtil.navigation = this.props.navigation
        return <DynamicTabNavigator />
    }
}