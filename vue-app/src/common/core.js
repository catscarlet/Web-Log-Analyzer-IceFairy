export const WebLogAnalyzer = (reader_result) =>  {
    let filecontent = reader_result.split('\n');
    let text = '';
    let raw = [];
    let format_regex = /(\d+\.\d+\.\d+\.\d+)\s+\S\s+\S\s+(\[.+\])\s+\"(\S+)\s(\S+)\s\S+\"\s+(\d\d\d)\s+(\d+|-)\s+\"(.*)\"\s\"(.*)\"/;
    let urlnoparam_regex = /(.+)(\?.*)*/;

    let i = 0;
    for (let variable of filecontent) {
        if (variable == '') {
            console.log('skip empty line');
            continue;
        }

        let line = {};
        let array1;
        if ((array1 = format_regex.exec(variable)) !== null) {

            let rawdata = array1[0];
            let host = array1[1];
            let time = strftime2Date(array1[2]);
            //let request = array1[3];
            let method = array1[3];
            let url = array1[4];
            let urlnoparam = url.split('?')[0];
            let status = array1[5];
            let byte = Number(array1[6]) ? Number(array1[6]) : 0;
            let referrer = array1[7];
            let referrerdomain = getReferrerDomain(referrer, variable);
            let ua = array1[8] == '' ? array1[8] : 'empty';

            line = {
                '0rawdata': rawdata,
                host: host,
                time: time,
                //request: request,
                method: method,
                url: url,
                urlnoparam: urlnoparam,
                status: status,
                byte: parseInt(byte),
                referrer: referrer,
                referrerdomain: referrerdomain,
                ua: ua,
            };

            raw.push(line);
        } else {
            console.log('failed to load this line:');
            console.log(variable);
        }
        text = text + variable + '\n';
    }

    console.log('step1 over');

    console.log(raw);

    if (raw.length == 0) {
        console.log('log not supported');
        return false;
    }

    let first_day = raw[0].time;
    let last_day = raw[raw.length - 1].time;

    let chart_data_traffic = {};
    let chart_data_time = {};
    let total_data_time = 0;
    let total_data_traffic = 0;

    for (let d = new Date(first_day.getTime()); dateobj2YYYYMM(d) <= dateobj2YYYYMM(last_day); d.setDate(d.getDate() + 1)) {
        let index = dateobj2YYYYMM(d);
        chart_data_traffic[index] = 0;
        chart_data_time[index] = 0;
    }

    let status_times = {};
    let status_traffic = {};

    //pre
    let top_ip_times_obj = {};
    let top_ip_traffic_obj = {};
    let top_urlnoparam_page_times_obj = {};
    let top_withparam_page_times_obj = {};
    let top_referrer_domain_times_obj = {};
    let top_referrer_page_times_obj = {};
    let top_referrer_domain_traffic_obj = {};
    let top_referrer_page_traffic_obj = {};
    let top_urlnoparam_page_traffic_obj = {};
    let top_withparam_page_traffic_obj = {};

    //iterate
    for (let line of raw) {
        top_ip_times_obj = prepareTopData(line, top_ip_times_obj, 'host');
        top_ip_traffic_obj = prepareTopData(line, top_ip_traffic_obj, 'host', 'byte');
        top_urlnoparam_page_times_obj = prepareTopData(line, top_urlnoparam_page_times_obj, 'urlnoparam');
        top_withparam_page_times_obj = prepareTopData(line, top_withparam_page_times_obj, 'url');
        top_urlnoparam_page_traffic_obj = prepareTopData(line, top_urlnoparam_page_traffic_obj, 'urlnoparam', 'byte');
        top_withparam_page_traffic_obj = prepareTopData(line, top_withparam_page_traffic_obj, 'url', 'byte');
        top_referrer_domain_times_obj = prepareTopData(line, top_referrer_domain_times_obj, 'referrerdomain');
        top_referrer_page_times_obj = prepareTopData(line, top_referrer_page_times_obj, 'referrer');
        top_referrer_domain_traffic_obj = prepareTopData(line, top_referrer_domain_traffic_obj, 'referrerdomain', 'byte');
        top_referrer_page_traffic_obj = prepareTopData(line, top_referrer_page_traffic_obj, 'referrer', 'byte');
        chart_data_traffic = prepareChartData(line, chart_data_traffic, 'byte');
        chart_data_time = prepareChartData(line, chart_data_time);
        status_traffic = prepareTopData(line, status_traffic, 'status', 'byte');
        status_times = prepareTopData(line, status_times, 'status');
        total_data_time++;
        total_data_traffic = prepareTraffic(line, total_data_traffic);
    }
    //post
    let top_ip_times_array = obj2arr(top_ip_times_obj);
    let top_ip_traffic_array = obj2arr(top_ip_traffic_obj);
    let top_urlnoparam_page_times_array = obj2arr(top_urlnoparam_page_times_obj);
    let top_withparam_page_times_array = obj2arr(top_withparam_page_times_obj);
    let top_urlnoparam_page_traffic_array = obj2arr(top_urlnoparam_page_traffic_obj);

    let top_withparam_page_traffic_array = obj2arr(top_withparam_page_traffic_obj);

    let top_referrer_domain_times_array = obj2arr(top_referrer_domain_times_obj);
    let top_referrer_page_times_array = obj2arr(top_referrer_page_times_obj);
    let top_referrer_domain_traffic_array = obj2arr(top_referrer_domain_traffic_obj);
    let top_referrer_page_traffic_array = obj2arr(top_referrer_page_traffic_obj);

    let analyzed_data = {
        'top_ip_times_array': top_ip_times_array,
        'top_ip_traffic_array': top_ip_traffic_array,
        'top_urlnoparam_page_times_array': top_urlnoparam_page_times_array,
        'top_withparam_page_times_array': top_withparam_page_times_array,
        'top_referrer_domain_times_array': top_referrer_domain_times_array,
        'top_referrer_page_times_array': top_referrer_page_times_array,
        'top_referrer_domain_traffic_array': top_referrer_domain_traffic_array,
        'top_referrer_page_traffic_array': top_referrer_page_traffic_array,
        'chart_data_traffic': chart_data_traffic,
        'chart_data_time': chart_data_time,
        'total_data_time': total_data_time,
        'total_data_traffic': total_data_traffic,
        'status_traffic': status_traffic,
        'status_times': status_times,
        'top_urlnoparam_page_traffic_array': top_urlnoparam_page_traffic_array,
        'top_withparam_page_traffic_array': top_withparam_page_traffic_array,
    };

    console.log('analyzed_data:');
    console.log(analyzed_data);
    console.log('Finish');

    return analyzed_data;

    //extra function
    function prepareTopData(line, obj, id, value) {
        if (value === undefined) {
            if (!obj.hasOwnProperty(line[id])) {
                obj[line[id]] = 1;
            } else {
                obj[line[id]] = obj[line[id]] + 1;
            }
        } else {
            if (!obj.hasOwnProperty(line[id])) {
                obj[line[id]] = line[value];
            } else {
                obj[line[id]] = obj[line[id]] + line[value];
            }
        }

        return obj;
    }

    function prepareChartData(line, obj, value) {
        let time_obj = new Date(line.time);
        let day = dateobj2YYYYMM(time_obj);

        if (value === undefined) {
            obj[day] = obj[day] + 1;
        } else {
            obj[day] = obj[day] + line[value];
        }

        return obj;
    }

    function prepareTraffic(line, obj) {
        obj = obj + line.byte;

        return obj;
    }

    function obj2arr(obj) {
        let result = [];
        for (let id in obj) {
            result.push(
                {
                    id: id,
                    value: obj[id],
                }
            );
        }
        result.sort(function(a, b) {
            return b.value - a.value;
        });
        return result;
    }

    function sortRawDataByTime(raw) {
        //let result = [];
        raw.sort(function(a, b) {
            return a.time - b.time;
        });
        return raw;
    }

    function strftime2Date(strftime_str) {
        let strftime_regex = /\[(\d\d)\/(\w\w\w)\/(\d\d\d\d)\:(\d\d)\:(\d\d)\:(\d\d)\s(\S\d\d\d\d)\]/;
        let arr;
        if ((arr = strftime_regex.exec(strftime_str)) !== null) {
            let year = arr[3];
            //year = year.toString();
            let month;
            switch (arr[2]) {
                case 'Jan':
                    month = 1;
                    break;
                case 'Feb':
                    month = 2;
                    break;
                case 'Mar':
                    month = 3;
                    break;
                case 'Apr':
                    month = 4;
                    break;
                case 'May':
                    month = 5;
                    break;
                case 'Jun':
                    month = 6;
                    break;
                case 'Jul':
                    month = 7;
                    break;
                case 'Aug':
                    month = 8;
                    break;
                case 'Sep':
                    month = 9;
                    break;
                case 'Oct':
                    month = 10;
                    break;
                case 'Nov':
                    month = 11;
                    break;
                case 'Dec':
                    month = 12;
                    break;
                default:
                    console.log('strftime2unixtimestamp month error');
            }

            let day = arr[1];
            let hour = arr[4];
            let minute = arr[5];
            let second = arr[6];
            let tz = arr[7];

            let commonTime = new Date(Date.UTC(year, month - 1, day, (hour - tz / 100), minute, second));

            return commonTime;
        } else {
            console.log('strftime2unixtimestamp error');
        }
    }

    function dateobj2YYYYMM(d) {
        let yyyymm = d.getFullYear().toString();

        if (d.getMonth() < 10) {
            yyyymm = yyyymm + '0';
        }

        yyyymm = yyyymm + (d.getMonth() + 1);

        if (d.getDate() < 10) {
            yyyymm = yyyymm + '0';
        }

        yyyymm = yyyymm + d.getDate();

        return yyyymm;
    }

    function getReferrerDomain(str, line) {
        if ((str == '-') || (str == 'blank') || (str == '')) {
            return '-';
        }
        let pattern = /(http\:\/\/|https\:\/\/)?([^\/\s]+)(\/)?(\S)*/;
        let array1;
        if ((array1 = pattern.exec(str)) !== null) {
            return array1[2];
        } else {
            console.log('This is not a valid referrer');
            console.log(line);
            console.log(str);
            return '-';
        }
    }
};
