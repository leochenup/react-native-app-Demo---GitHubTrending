import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import DataStore from '../expand/dao/DataStore'

export default class DataStoreDemoPage extends Component {

    state = {
        value: '什么都没有！'
    }

    dataStore = new DataStore()

    loadData = async () => {
        let url = `https://api.github.com/search/repositories?q=${this.value}`
        try {
            let items = await this.dataStore.fetchData(url)
            this.setState({
                value: `初次加载时间：\n ${new Date(items.timestamp)}\n${JSON.stringify(items.data)}\n`
            })
        } catch (error) {
            this.setState({
                value: '加载失败' + error.message
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                < Text style={styles.text}>离线缓存框架</Text>
                <TextInput
                    style={styles.input}
                    placeholder='请输入'
                    onChangeText={text => {
                        this.value = text
                    }}
                />
                <View>
                    <Text onPress={() => {
                        this.loadData()
                    }}>
                        获取数据
                    </Text>
                </View>

                <Text >{this.state.value}</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50
    },
    text: {
        fontSize: 30
    },
    input: {
        borderWidth: 1,
        width: '80%',
        padding: 0,
        height: 30,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 5
    }
})