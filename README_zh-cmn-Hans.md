# Web-Log-Analyzer-IceFairy

## Introduction

这是一款 Client-Only 的 Web Log 的工具。

此款工具致力于在本地直接加载 apache.log 并进行分析。工具并不会向服务端发送任何数据，日志分析全部在本地浏览器中进行。

目前功能仍在开发中。很多功能都没有实现。

## Demo

[Demo on Cloudflare](https://server2.catscarlet.com/demo/Web-Log-Analyzer-IceFairy/)

If you need a log-file as test simple, here is a log-file from my bike404-site:
- [Apache log simple on  MEGA](https://mega.nz/#!OsNhxQCL!Rx3enFeVI4pJY0hp3zS2JlokGWx38UizbzLTcK2eLIY)
- [Apache log simple on BaiduNetDisk](https://pan.baidu.com/s/1CZD_dDxd4P_Fp6S0xv1uWw) \(Password: mnhq \)

## 3rd-pty

- vue
- vue-router
- element-ui
- chart.js
- vue-chartjs

## Serve & Build

因为是 yarn.lock 所以：

- `yarn run serve`
- `yarn run build`

## Known-Issues

- 因为数据信息目前是保存在 locatstorage 中，当信息大于 5M 时（约30W条日志），**Chrome 可能直接崩溃并不提示任何相关信息**，Firefox 则会报错 `NS_ERROR_DOM_QUOTA_REACHED: Persistent storage maximum size reached` ，可修改 Firefox 的 `about:config` 中的 `dom.storage.default_quota` 来扩大限制。
- 没有分析进度，因为调用 setTimeout 会产生严重的浏览器 IDLE 时间，导致效率大幅下降（至少60倍）。
- Analyze Status 没有 Analyzing，不知为何 `vue.$nextTick()` 没有效果。
- 修改 `Number per Page` 会导致整页刷新，因为 vue-router 没有提供也不能实现当前路由重建重载。
- VUE 以及 Element UI 的各种 BUGS 可能会导致今天还能用，过一夜之后再编译就满页疮痍。

## Why named IceFairy

配色

## Contribute

Pull requests are welcome. Please sent pull request to dev branch.

## License

Mozilla Public License Version 2.0
