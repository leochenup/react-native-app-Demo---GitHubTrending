import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './navigators/AppNavigator'
import store from "./store/index";

export default class App extends Component {
    render() {
        return (
            /**
             * 将store 传递给 App
             */
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        )
    }
}