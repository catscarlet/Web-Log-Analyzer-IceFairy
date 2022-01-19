function youAreNotSupported() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1) {
        return true; //IE 10, 9, 8, 7, 6
    } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true; //IE 11
    }
    return false;
}

if (youAreNotSupported()) {
    alert('Your Browser is not supported.');
}
