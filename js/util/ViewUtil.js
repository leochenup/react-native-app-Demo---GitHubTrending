import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'


export class ViewUtil {
    static getLeftBackButton(callback) {
        return (
            <TouchableOpacity
                style={{ padding: 8, paddingLeft: 12 }}
                onPress={callback}
            >
                <Ionicons
                    name='ios-arrow-back'
                    size={20}
                    style={{ color: 'white' }}
                />
            </TouchableOpacity>
        )
    }
    static getShareBackButton(callback) {
        return (
            <TouchableOpacity
                onPress={callback}
            >
                <Ionicons
                    name='md-share'
                    size={20}
                    style={{ opacity: 0.9, marginRight: 10, color: 'white' }}
                />
            </TouchableOpacity>
        )
    }

}