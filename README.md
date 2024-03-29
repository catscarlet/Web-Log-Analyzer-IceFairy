# Web-Log-Analyzer-IceFairy

## Introduction

This is a Client-Only web log analyzing tool.

This tool is dedicated to analyze apache.log in local browser. It won't send log to server. All works will be done in local browser.

This tool reads log line by using regex and support default format of apache log `LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\""`

like：

```
117.14.147.49 - - [21/Feb/2021:00:40:26 +0800] "GET / HTTP/1.1" 200 906 "https://www.catscarlet.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0"
```

For now it doesn't support customized format. If you want to analyze your customized log, you need to change your log file to default format, or modify core.js by yourself.

## Screenshot

![Web-Log-Analyzer-IceFairy snap-chart](snap-chart.png "Web-Log-Analyzer-IceFairy snap-chart")

![Web-Log-Analyzer-IceFairy snap-table](snap-table.png "Web-Log-Analyzer-IceFairy snap-table")

## Demo

[Demo on Cloudflare](https://server2.catscarlet.com/demo/Web-Log-Analyzer-IceFairy/)

If you need a log-file as test simple, here is a log-file from my bike404-site:
- [Apache log simple on  MEGA](https://mega.nz/#!OsNhxQCL!Rx3enFeVI4pJY0hp3zS2JlokGWx38UizbzLTcK2eLIY)
- [Apache log simple on BaiduNetDisk](https://pan.baidu.com/s/1CZD_dDxd4P_Fp6S0xv1uWw) \(Password: mnhq \)

## 3rd party libraries

- vue
- vue-router
- element-ui
- chart.js
- vue-chartjs

## Serve & Build

yarn.lock, so:

- `yarn run serve`
- `yarn run build`

## Known-Issues

- The analyed data is saved in locatstorage. When the size of data is over than 5M (about 300,000 lines), **Chrome may crash straightly without any information**. Firefox will stop the script and throw `Persistent storage maximum size reached` , It can be avoid by setting `about:config` - `dom.storage.default_quota` on Firefox to expand the limit.
- No progress info when analyzing. Using setTimeout will cause terrible IDLE time, that would waste about at least 60 times of time.
- Analyze Status can't show Analyzing. No idea why `vue.$nextTick()` refused to work.
- Change `Number per Page` will cause page refreshing. vue-router don't support safe reload or instant reload.
- If already in route `/ChartDataTraffic` and try to analyze a new file, the page would refresh. Same reason as above.
- Vue and Element UI will cause any kinds of unknown bugs. The code is working today, but tomorrow, it may be unavaliable to build with no reason. The Element UI will be much maintained. I'm going to choose another UI Library.
- Not support IPv6 yet.

## Why named IceFairy

I don't want to name it as just 'Web Log Analyzer', and the color scheme is ice fairy so, this is it.

## License

Mozilla Public License Version 2.0
