import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

import DynamicTabNavigator from "../navigators/DynamicTabNavigator";



export default class HomePage extends Component {


    render() {
        return <DynamicTabNavigator />
    }
}