import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import { connect } from 'react-redux'
import actions from '../action'

class FavoritePage extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.welcomeText}>FavoritePage</Text>
                <Button
                    title={'修改主题'}
                    onPress={() => {
                        this.props.ontThemeChange('green')
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


export default connect(
    null,
    { ontThemeChange: actions.ontThemeChange }
)(FavoritePage)