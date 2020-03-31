import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native'

export default class FetchDemoPage extends Component {


    state = {
        text: '什么都没有'
    }

    _getRepositories = (key) => {
        let url = `https://api.github.com/search/repositories?q=${key}`
        return fetch(url).then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('FALSE!')
        })
    }

    render() {
        return (
            <View style={styles.container}>
                < Text style={styles.text}>FetchDemoPage</Text>
                <TextInput
                    style={styles.input}
                    ref='keywords'
                    placeholder='请输入要查询的仓库关键字'
                    onChangeText={text => {
                        this.searchkey = text
                    }}
                />
                <Button
                    title='发送请求'
                    onPress={async () => {
                        let key = this.searchkey
                        try {
                            let data = await this._getRepositories(key)
                            this.setState({
                                text: JSON.stringify(data)
                            })
                        } catch (error) {
                            this.setState({
                                text: '出错了！' + error.message
                            })
                        }
                    }}
                />
                <ScrollView style={styles.scrollCon} >
                    <Text style={styles.datatext}>{this.state.text}</Text>
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom:50
    },
    text: {
        fontSize: 30
    },
    input: {
        width: '80%',
        height: 40,
        padding: 0,
        borderWidth: 1,
        paddingLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5
    },
    datatext: {
        fontSize: 20,
        width: '100%',
        padding:10,
        
    },
    scrollCon: {
        width: '80%',
        borderWidth: 1,
        marginTop:20,
        borderRadius:5,
        borderColor: 'grey'
    }
})