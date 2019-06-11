export const toThousands = (number) =>  {
    let num = (number || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }

    return result;
};

export const loadNumberPerPage = () =>  {

    return window.localStorage.getItem('num_per_page');
};

export const excludeByIdFilter = (item, exclude) =>  {
    if (item.id.search(exclude) == -1) {
        return true;
    } else {
        return false;
    }
};

export const GlobalSaveAnalyzedData = (analyzed_data) =>  {
    let analyzed_data_str = JSON.stringify(analyzed_data);
    console.log('analyzed_data_str length: ' + analyzed_data_str.length);
    let analyzed_data_storage = analyzed_data_str;

    try {
        window.localStorage.setItem('AnalyzedDataStorage', analyzed_data_storage);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

export const GlobalGetAnalyzedData = () =>  {
    let analyzed_data_storage = window.localStorage.getItem('AnalyzedDataStorage');

    return JSON.parse(analyzed_data_storage);
};
