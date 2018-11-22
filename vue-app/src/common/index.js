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
