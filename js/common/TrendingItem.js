import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

/**
 * 接受两个props 参数
 * item ： item的数据
 * onSelect 点击响应的事件函数
 */
export default class TrendingItem extends Component {
    render() {
        const { item } = this.props
        if (!item) return null

        let favoriteButton = (
            <TouchableOpacity
                style={{ padding: 6 }}
                onPress={() => {
                }}
                underlayColor={'red'}
            >
                <FontAwesome
                    name='star-o'
                    size={26}
                    color='red'
                />
            </TouchableOpacity>
        )
        let description = item.description.replace(/<\/*[0-9a-z-\s=":/._]*>/g, '')
        console.log(item)
        return (
            <TouchableOpacity
                onPress={this.props.onSelect}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.fullName}</Text>
                    <Text style={styles.description}>{description}</Text>
                    {/* <Text style={styles.fork}>fork count: 200</Text> */}
                    <Text style={styles.fork}>fork count: {item.forkCount}</Text>

                    <View style={styles.row}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: 'center' }}>
                            <Text style={{ fontSize: 14 }}>contributors: </Text>
                            {item.contributors.map((val, i) => {
                                return i % 2 !== 0 ? (<Image style={{ height: 26, width: 26, borderRadius: 15, borderColor: '#8c8c8c', borderWidth: 1, marginLeft: 5 }}
                                    key={'image' + i + val}
                                    source={{ uri: val }}
                                />) : null
                            })}
                        </View>
                        {favoriteButton}
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
        // marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    fork: {
        fontSize: 14,
        marginTop: 2,

    }

})