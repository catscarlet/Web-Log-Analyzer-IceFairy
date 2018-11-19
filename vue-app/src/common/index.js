export const toThousands = (num) =>  {

    return num.toLocaleString('en-US');
};

export const loadNumberPerPage = () =>  {

    return window.localStorage.getItem('num_per_page');
};
