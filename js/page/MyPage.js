import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { connect } from 'react-redux'
import actions from '../action'
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const THEME_COLOR = '#1E90FF'

class MyPage extends Component {

    getRightButton = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={{ padding: 5, marginRight: 8 }}>
                        <Feather
                            name={'search'}
                            size={24}
                            color={'white'}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    getLeftButton = (callback) => {
        return (
            <TouchableOpacity
                style={{ padding: 8, paddingLeft: 8 }}
                onPress={callback}>
                <View style={{ padding: 5, marginRight: 8 }}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={24}
                        color={'white'}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = (
            <NavigationBar
                title={'我的'}
                statusBar={statusBar}
                style={{ backgroundColor: THEME_COLOR }}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={styles.container} >
                {navigationBar}
                <Text style={styles.welcomeText}>MyPage</Text>
                <Button
                    title={'修改主题'}
                    onPress={() => {
                        this.props.ontThemeChange('black')
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#f5fcff'
    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    }

})
export default connect(
    null,
    { ontThemeChange: actions.ontThemeChange }
)(MyPage)