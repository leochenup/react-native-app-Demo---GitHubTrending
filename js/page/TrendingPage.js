import React, { Component } from 'react'
import {
    View,
    ActivityIndicator,
    StyleSheet,
    Platform,
    Text,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'

import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'

import TrendingDialog, { TimeSpans } from '../common/TrendingDialog'
import TimeSpan from '../model/TimeSpan'
import NavigationBar from '../common/NavigationBar'

import actions from '../action/index'
import { connect } from 'react-redux'
import TrendingItem from '../common/TrendingItem'
import Toast from 'react-native-easy-toast'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// !!!
// import HTMLView from 'react-native-htmlview'

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE'
const THEME_COLOR = '#1E90FF'

export default class TrendingPage extends Component {

    tabNames = ['JavaScript', 'C', 'C#', 'PHP', 'Java', 'Python'];

    state = {
        timeSpan: TimeSpans[0]
    }

    _genTabs = () => {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLabel={item} />,
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs;
    }

    _renderTextView = () => {
        return (
            <View>
                <TouchableOpacity
                    underlayColor='transparent'
                    onPress={() => this.dialog.show()}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            fontWeight: '400'
                        }}>趋势 {this.state.timeSpan.showText}</Text>
                        <MaterialIcons
                            name={'arrow-drop-down'}
                            size={22}
                            style={{ color: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _renderTrendingDialog = () => {
        return (
            <TrendingDialog
                ref={dialog => this.dialog = dialog}
                onSelect={tab => this.onSelectTimeSpan(tab)}
            />
        )
    }

    onSelectTimeSpan = (tab) => {
        this.dialog.dismiss()
        this.setState({ timeSpan: tab })
        DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
    }

    _genTabNav = () => {
        if (!this.tabNav) {
            this.tabNav = createAppContainer(createMaterialTopTabNavigator(
                this._genTabs(),
                {
                    tabBarOptions: {
                        tabStyle: styles.tabStyle,
                        upperCaseLabel: false,
                        scrollEnabled: true, //是否可以滚动
                        style: {
                            backgroundColor: '#1E90FF',
                            height: 50
                        },
                        indicatorStyle: styles.indicatorStyle,
                        labelStyle: styles.labelStyle
                    },
                },
            ));
        }
        return this.tabNav
    }

    render() {
        //设置自定义头部导航栏
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        let navigationBar = (
            <NavigationBar
                titleView={this._renderTextView()}
                statusBar={statusBar}
                style={{ backgroundColor: THEME_COLOR }}
            />
        )

        const TabNavigator = this._genTabNav()// 选择时间后不刷新顶部tab
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator />
                {this._renderTrendingDialog()}
            </View>
        );
    }
}

const pageSize = 10
//tab选项页面
class TrendingTab extends Component {

    //得到标签名称
    storeName = this.props.tabLabel
    timeSpan = this.props.timeSpan

    componentDidMount() {
        this.loadData(false)
        this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan
            this.loadData(false)
        })
    }

    componentWillUnmount = () => {
        if (this.timeSpanChangeListener) {
            this.timeSpanChangeListener.remove()
        }
    }

    /**
     * 加载数据
     */
    loadData = (loadMore) => {
        console.log('执行loadData...')
        let { onLoadTrendingData, onLoadMoreTrendingData } = this.props
        const store = this._store()
        let url = this.genFetchUrl(this.storeName, this.timeSpan.searchText)
        if (loadMore) { //加载更多
            console.log(loadMore, '执行加载更多')
            onLoadMoreTrendingData(this.storeName, ++store.pageIndex, pageSize, store.items, (e) => {
                this.refs.toast.show(e)
            })
        } else { //普通加载，不加载更多
            onLoadTrendingData(this.storeName, url, pageSize)
        }
    }

    /**
     * 获取请求URL
     */
    genFetchUrl = (key, querystring) =>
        `https://github.com/trending/${key.split(' ').join('')}?${querystring}`


    /**
     * 生成列表项
     *  */
    _renderItem = (item) => {
        return (<TrendingItem item={item.item} onSelect={() => { }} />)
    }


    onSelect = () => {

    }


    _store = () => {
        const { trending } = this.props
        let data = trending[this.storeName]
        if (!data) {
            data = {
                items: [],
                isloading: false,
                projectModes: [], //要显示的数据
                hideLoadingMore: true //默认隐藏加载更多
            }
        }
        return data
    }

    genIndicator = () => {
        return this._store().hideLoadingMore
            ? null
            : (
                <View style={styles.indicaitorContainer}>
                    {/*显示圆形加载图标*/}
                    <ActivityIndicator
                        style={styles.indicator}
                    />
                    <Text>正在加载更多...</Text>
                </View>
            )
    }


    render() {
        const data = this._store()
        console.log('render')
        return (
            <View >
                <FlatList
                    style={{ width: '100%', height: '100%' }}
                    data={data.projectModes}
                    renderItem={this._renderItem}
                    keyExtractor={(item) => "" + (item.id || item.fullName)}
                    refreshControl={//刷新控制
                        <RefreshControl //下拉刷新的组件
                            title='loading'
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={data.isloading}//显示加载图标条件
                            onRefresh={() => {
                                this.loadData(false)
                            }} //下拉刷新时回调的函数
                            tintColor={THEME_COLOR}
                        />
                    }
                    // footer组件设置
                    ListFooterComponent={this.genIndicator()}
                    onEndReached={() => { //会多次调用
                        setTimeout(() => { //确保  loadData 在 onMomentumScrollBegin 调用
                            if (this.canLoadMore) {
                                console.log('---------loadData 调用了')
                                this.loadData(true)
                                this.canLoadMore = false
                            }
                        }, 100)
                    }}
                    //?比值？？
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => { //刚开始点击滚动的时候触发该事件
                        this.canLoadMore = true //fix 初始化滚动时调用 onEndReached ，防止多次执行
                    }}
                />
                <Toast ref={'toast'}
                    position={'center'}
                />
            </View>
        );
    }
}

//关联store 与组件
const TrendingTabPage = connect(
    state => ({ ...state }),
    {
        onLoadTrendingData: actions.onLoadTrendingData,
        onLoadMoreTrendingData: actions.onLoadMoreTrendingData
    }
)(TrendingTab)



const styles = StyleSheet.create({
    popular: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
        // ...Platform.select({
        //     ios: {
        //         marginTop: 50,
        //     },
        //     android: {
        //         marginTop: 0,
        //     },
        // }),
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        // minWidth: 50,
        padding: 0
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 15,
        margin: 0
        // marginTop: 6,
        // marginBottom: 6,
    },
    indicaitorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
})