import AsyncStorage from '@react-native-community/async-storage';
import Trending from 'GitHubTrending'

export const FLAG_STORAGE = { flag_popular: 'popular', flag_trending: 'trending' }

export default class DataStore {

    /**
     *入口方法
     */
    fetchData = (url, flag) => {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then(wrapData => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url, flag).then(data => {
                        resolve(this._wrapdata(data))
                    }).catch((err) => {
                        reject(err)
                    })
                }
            }).catch((err) => {
                this.fetchNetData(url, flag).then(data => {
                    resolve(this._wrapdata(data))
                }).catch(err => {
                    reject(err)
                })
            })
        })
    }

    /**
     * 存储数据
     */
    saveData = (url, data, callback) => {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapdata(data)), callback);
    };

    /**
     * 从本地取数据
     */
    fetchLocalData = url => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (err, res) => {
                if (!err) {
                    try {
                        resolve(JSON.parse(res));
                    } catch (err) {
                        reject(err);
                        console.error(err);
                    }
                } else {
                    reject(err);
                    console.error(err);
                }
            });
        });
    };

    /**
     * 获取网络数据
     */
    fetchNetData = (url, flag) => {
        return new Promise((resolve, reject) => {
            if (flag === FLAG_STORAGE.flag_popular) {
                console.log('获取flag_popular 数据')
                fetch(url) //获取flag_popular 数据
                    .then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        throw new Error('Network response was not ok')
                    })
                    .then(res => {
                        this.saveData(url, res);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            } else {//获取trending数据
                new Trending().fetchTrending(url)
                    .then((items) => {
                        console.log('获取trending数据', items)
                        if (!items) throw new Error('trending:response data is null')
                        this.saveData(url, items)
                        resolve(items)
                    }).catch((error) => {
                        console.log('获取trending数据', error)
                        reject(error);
                    })
            }

        });
    };

    /**
     *  包装数据
     */
    _wrapdata = data => {
        return {
            data: data,
            timestamp: new Date().getTime(),
        };
    };

    /**
     * 判断数据是否过期
     */
    static checkTimestampValid = timestamp => {
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getFullYear() !== targetDate.getFullYear()) return false
        if (currentDate.getMonth() !== targetDate.getMonth()) return false
        if (currentDate.getDate() !== targetDate.getDate()) return false
        if (currentDate.getHours() !== targetDate.getHours()) return false
        return true
    }

}
