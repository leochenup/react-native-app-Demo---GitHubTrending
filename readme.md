 ## 趋势
 ### 切换趋势时间段后如何避免头部 tab 刷新？
 由于顶部 tab 是动态创建的，每次state改变就会重新生成，因此生成前需要判断一下，如果为空再生成，不为空则使用原来的。

 ### DevicesEventEmitter 事件发送器

 ``` javascript
    //定义事件监听，并传递参数
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)

    //事件监听回调，事件发生，回调函数调用
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {
            this.timeSpan = timeSpan
            this.loadData(false)
    })
 ```