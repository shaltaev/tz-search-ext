"use strict";
if (window && window.location.href.includes('google')) {
    var inputEl_1 = document.querySelector('input[aria-label="Search"]') ||
        document.querySelector('input[aria-label="Найти"]') ||
        undefined;
    if ((inputEl_1 === null || inputEl_1 === void 0 ? void 0 : inputEl_1.value) !== '') {
        var searchEl = document.querySelector('div#search') || undefined;
        if (searchEl) {
            var items = document.querySelectorAll('div.g');
            items.forEach(function (item) {
                var title = item.querySelector('h3');
                var description = item.querySelector('span.st');
                chrome.storage.sync.get('toGoField', function (data) {
                    var search = data.toGoField || '';
                    if (search.length > 1 && ((title === null || title === void 0 ? void 0 : title.innerText.toLowerCase().includes(search.toLowerCase())) || (description === null || description === void 0 ? void 0 : description.innerText.toLowerCase().includes(search.toLowerCase())))) {
                        var anchor = item.querySelector('div.r > a');
                        if (anchor) {
                            anchor.click();
                        }
                    }
                });
            });
        }
    }
}
