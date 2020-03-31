import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import NavigationUtil from '../navigators/NavigationUtils'

export default class WelcomepPage extends Component {
    componentDidMount() {
        console.log('创建定时器')
        this.timer = setTimeout(() => {
            //跳转到首页
            NavigationUtil.resetToHomePage(this.props)
        }, 500)

    }
    componentWillUnmount() {
        console.log('定时销毁')
        clearTimeout(this.timer)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>WelcomepPage</Text>
                <Button
                    title={'跳过'}
                    onPress={() => {
                        //跳转到首页
                        NavigationUtil.resetToHomePage(this.props)
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})