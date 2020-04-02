import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import BaseItem from '../common/BaseItem'

/**
 * 接受两个props 参数
 * item ： item的数据
 * onSelect 点击响应的事件函数
 */
export default class PopularItem extends BaseItem {
    render() {
        const { projectModel } = this.props
        const { item } = projectModel
        if (!item || !item.owner) return null

        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.full_name ? item.full_name : item.fullName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.row}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14 }}>Author: </Text>
                            <Image style={{ height: 26, width: 26, borderRadius: 15, borderColor: '#8c8c8c', borderWidth: 1 }}
                                source={{ uri: item.owner.avatar_url }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text>Stars:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}



const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: 'center',
        // marginTop: 3
    },
    cell_container: {
        backgroundColor: "white",
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',//iOS 设置阴影
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2 //android 设置阴影
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }

})