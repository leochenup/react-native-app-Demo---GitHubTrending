import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { View, Text, StyleSheet, ViewPropTypes, StatusBar, Platform } from 'react-native'

const NAV_BAR_HEIGHT_IOS = 44 //IOS 导航栏高度
const NAV_BAR_HEIGHT_ANDROID = 44 // android 导航栏高度
const STATUS_BAR_HEIGHT = 44 // 状态栏高度

const StatusBarShape = { //设置状态栏所接受属性
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string
}

export default class NavigationBar extends Component {
    //提供类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    }
    //默认属性
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    }

    getButtonElement(button) {
        return (
            <View style={styles.navBarButton}>
                {button ? button : null}
            </View>
        )
    }

    render() {
        let statusBar = !this.props.statusBar.hidden
            ? (
                <View style={styles.statusBar}>
                    <StatusBar {...this.props.statusBar} />
                </View>
            )
            : null

        let titleView = this.props.titleView
            ? this.props.titleView
            : <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
                {this.props.title}
            </Text>

        let content = this.props.hide
            ? null
            : (<View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>)

        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E90FF'
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Platform.select({
            ios: {
                height: NAV_BAR_HEIGHT_IOS,
            },
            android: {
                height: NAV_BAR_HEIGHT_ANDROID,
            },
        }),
    },
    navBarButton: {
        alignItems: "center",
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: 'white'
    },
    statusBar: {
        ...Platform.select({
            ios: {
                height: STATUS_BAR_HEIGHT,
            },
            android: { //系统已经流出状态栏的高度了
                height: 0,
            },
        }),
    },

})