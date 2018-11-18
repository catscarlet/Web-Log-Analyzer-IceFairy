export const toThousands = (num) =>  {
    /*
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    */
    return num.toLocaleString('en-US');
};

export const loadNumberPerPage = () =>  {
    let num_per_page = window.localStorage.getItem('num_per_page');
    //consoel.log('loadNumberPerPage:' + loadNumberPerPage);
    return window.localStorage.getItem('num_per_page');
};
