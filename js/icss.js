/* MIT License (MIT) - Copyright (c) 2015 HTML5andBeyond.com */

$.fn.iCSS = function(property, value) {

var getStyle = this.attr('style');

if (getStyle == undefined) {
this.attr('style', property + ': ' +  value + '!important;')
} else if (getStyle.slice(-1) != ';') {
this.attr('style', getStyle + '; ' + property + ': ' +  value + '!important;');
} else {
this.attr('style', getStyle + property + ': ' +  value + '!important;');
}

}