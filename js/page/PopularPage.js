import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform,Button } from 'react-native'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

export default class PopularPage extends Component {


    _tabNavigator = () => createAppContainer(createMaterialTopTabNavigator({
        PopularTab1: {
            screen: PopularTab,
            navigationOptions: {
                title: 'Tab1'
            }
        },
        PopularTab2: {
            screen: PopularTab,
            navigationOptions: {
                title: 'Tab2'
            }
        }
    }))

    render() {
        const Tab = this._tabNavigator()
        return (
            <View style={styles.TabContainer} >
                <Tab />
            </View>)


    }
}


//tab选项页面
class PopularTab extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.text}>PopularTab</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    TabContainer: {
        flex: 1,
        backgroundColor: '#f5fcff',
        ...Platform.select({
            ios: {
                marginTop: 50,
            },
            android: {
                marginTop: 0,
            },
        }),
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    }

})