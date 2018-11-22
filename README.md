# Web-Log-Analyzer-IceFairy

## Introduction

This is a Client-Only web log analyzing tool.

This tool is dedicated to analyze apache.log in local browser. It won't send log to server. All works will be done in local browser.

This project is still WIP.

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

yarn.lock, so:

- `yarn run serve`
- `yarn run build`

## Known-Issues

- The analyed data is saved in locatstorage. When the size of data is over than 5M (about 300,000 lines), **Chrome may crash straightly without any information**. Firefox will stop the script and throw `Persistent storage maximum size reached` , It can be avoid by setting `about:config` - `dom.storage.default_quota` to expand the limit.
- No progress info when analyzing. Using setTimeout will cause terrible IDLE time, that would waste about at least 60 times of time.
- Analyze Status can't show Analyzing. No idea why `vue.$nextTick()` refused to work.
- Change `Number per Page` will cause page refreshing. vue-router don't support safe reload or instant reload.
- VUE and Element UI will cause any kinds of unknown bugs. The code is working today, but tomorrow, it may be unavaliable to build with no reason.

## Why named IceFairy

I don't want to name it as just 'Web Log Analyzer', and the color scheme is ice fairy so, this is it.

## Contribute

Pull requests are welcome. Please sent pull request to dev branch.

## License

Mozilla Public License Version 2.0
