import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Button, ScrollView, TextInput } from 'react-native'

const key = 'save_key'

export default class AsyncstorageDemo extends Component {
    state = {
        value: ''
    }

    doSave = async (key, value) => {
        try {
            let item = await AsyncStorage.setItem(key, JSON.stringify(value))
            this.setState({
                value: '存储成功'
            })
        } catch (error) {
            this.setState({
                value: '存储失败' + error.message
            })
        }
    }

    doRemove = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
            this.setState({
                value: '删除成功!'
            })
        } catch (error) {
            this.setState({
                value: '删除失败!'
            })
        }
    }

    getData = async (key) => {
        try {
            let item = await AsyncStorage.getItem(key)
            this.setState({
                value: item
            })
        } catch (error) {
            this.setState({
                value: '获取出错！'
            })
        }
    }

    update = async (key, value) => {
        try {
            await AsyncStorage.mergeItem(key, JSON.stringify(value))
            this.setState({
                value: '更新成功'
            })
        } catch (error) {
            this.setState({
                value: '更新出错！'
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>

                < Text style={styles.text}>AsyncstorageDemo</Text>

                <TextInput
                    style={styles.input}
                    ref='keywords'
                    placeholder='请输入'
                    onChangeText={text => {
                        this.value = text
                    }}
                />
                <View style={styles.btncontainer}>
                    <Button
                        style={styles.button}
                        title='存储'
                        onPress={() => {
                            this.doSave(key, this.value)
                        }}
                    />
                    <Button
                        style={styles.button}
                        title='删除'
                        onPress={() => {
                            this.doRemove(key)
                        }}
                    />
                    <Button
                        style={styles.button}
                        title='获取'
                        onPress={() => {
                            this.getData(key)
                        }}
                    />
                    <Button
                        style={styles.button}
                        title='更新'
                        onPress={() => {
                            this.update(key, this.value)
                        }}
                    />
                </View>

                <ScrollView style={styles.scrollCon} >
                    <Text style={styles.datatext}>{this.state.value}</Text>
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 30
    },
    text: {
        fontSize: 30
    },
    btncontainer: {
        marginTop: 10,
        flex: 1,
        justifyContent: 'space-around',
        width: '100%'
    },
    datatext: {
        fontSize: 20,
        width: '100%',
        padding: 10,

    },
    scrollCon: {
        width: '80%',
        borderWidth: 1,
        marginTop: 20,
        borderRadius: 5,
        borderColor: 'grey'
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
})