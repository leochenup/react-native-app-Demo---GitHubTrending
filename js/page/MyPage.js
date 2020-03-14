import React, { Component } from 'react'
import { View, Text, StyleSheet, Button} from 'react-native'

export default class MyPage extends Component {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container} >
                <Text style={styles.welcomeText}>MyPage</Text>
                <Button
                    title={'修改主题'}
                    onPress={() => {
                        return navigation.setParams({
                            theme:{
                                tintColor: 'yellow',
                                updateTime: new Date().getTime()
                            }
                        })
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
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    }

})