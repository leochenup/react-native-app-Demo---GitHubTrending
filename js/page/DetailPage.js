import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import NavigationBar from '../common/NavigationBar'
import { ViewUtil } from '../util/ViewUtil'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtils from '../navigators/NavigationUtils'
import BackPressComponent from '../common/BackPressComponent';

const THEME_COLOR = '#1E90FF'
const baseUrl = 'https://github.com'

export default class DetailPage extends Component {

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params
        const { item } = this.params
        this.url = item.html_url || baseUrl + item.url
        this.state = {
            title: item.fullName || item.full_name,
            url: this.url,
            canGoBack: false //能否返回
        }
        //android物理返回键的处理
        this.backPress = new BackPressComponent({ backPress: this.onBackPress })
    }

    //android物理返回键的处理
    componentDidMount() {
        this.backPress.componentDidMount()
    }
    //android物理返回键的处理
    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }
    //android物理返回键的处理
    onBackPress = () => {
        this.onBack()
        return true
    }

    onBack = () => {
        if (this.state.canGoBack) {
            this.webView.goBack()//返回上一页
        } else {
            NavigationUtils.goBack(this.props.navigation)
        }
    }

    /**
     * 生成导航栏右边的按钮
     */
    getRightBackButton = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <FontAwesome
                        name='star-o'
                        size={20}
                        style={{ color: 'white', marginRight: 10 }}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareBackButton(() => {//分享逻辑

                })}
            </View>
        )
    }

    onNavigationStateChange = (navState) => {
        this.setState({ //webview 导航状态发生改变。修改 URL 以及是否可以返回的标志canGoBack
            canGoBack: navState.canGoBack,
            url: navState.url
        })
    }



    render() {
        //设置自定义头部导航栏
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = (
            <NavigationBar
                title={this.state.title}
                statusBar={statusBar}
                leftButton={ViewUtil.getLeftBackButton(this.onBack)}
                rightButton={this.getRightBackButton()}
                style={{ backgroundColor: THEME_COLOR }}
            />
        )
        return (
            <View style={styles.container} >
                {navigationBar}
                <WebView
                    ref={webView => this.webView = webView}
                    startInLoadingState={true} //加载时显示加载图标
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{ uri: this.state.url }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10
    }

})