"use strict";
var SEARCH_TEXT = 'ООО "Восточный"';
if (window && window.location.href.includes('google')) {
    var inputEl = document.querySelector('input[aria-label="Search"]') ||
        document.querySelector('input[aria-label="Найти"]') ||
        undefined;
    if ((inputEl === null || inputEl === void 0 ? void 0 : inputEl.value) !== '') {
        var searchEl = document.querySelector('div#search') || undefined;
        if (searchEl) {
            var items = document.querySelectorAll('div.g');
            items.forEach(function (item) {
                var title = item.querySelector('h3');
                var description = item.querySelector('h3');
                if ((title === null || title === void 0 ? void 0 : title.innerText.toLowerCase().includes(SEARCH_TEXT.toLowerCase())) || (description === null || description === void 0 ? void 0 : description.innerText.toLowerCase().includes(SEARCH_TEXT.toLowerCase()))) {
                    var anchor = item.querySelector('div.r > a');
                    if (anchor) {
                        anchor.click();
                    }
                }
            });
        }
    }
}
