"use strict";
var jobs = [];
var isRestNow = false;
var getRest = function () {
    isRestNow = true;
    var toDo = jobs.filter(function (j) { return !j.visited; });
    toDo.forEach(function (j) {
        j.element.setAttribute('style', "background-color: #0ff7;");
    });
    setTimeout(function () {
        toDo.forEach(function (j) {
            j.element.setAttribute('style', "background-color: #0f07;");
        });
        isRestNow = false;
    }, 5000);
};
if (window && window.location.href.includes('google')) {
    var inputEl = document.querySelector('input[aria-label="Search"]') ||
        document.querySelector('input[aria-label="Найти"]') ||
        undefined;
    if ((inputEl === null || inputEl === void 0 ? void 0 : inputEl.value) !== '') {
        chrome.storage.sync.get(['keyword', 'url'], function (data) {
            var search = data.keyword || '';
            var url = data.url || '';
            if (search.length > 1 && url.length > 1) {
                var searchEl = document.querySelector('div#search') || undefined;
                if (searchEl) {
                    var items = document.querySelectorAll('div.g');
                    items.forEach(function (item) {
                        var title = item.querySelector('h3');
                        var description = item.querySelector('span.st');
                        var cite = item.querySelector('cite');
                        var isInTitle = (title === null || title === void 0 ? void 0 : title.innerText.toLowerCase().includes(search.toLowerCase())) || false;
                        var isInDescription = (description === null || description === void 0 ? void 0 : description.innerText.toLowerCase().includes(search.toLowerCase())) || false;
                        var isInCite = (cite === null || cite === void 0 ? void 0 : cite.innerText.toLowerCase().includes(url.toLowerCase())) || false;
                        if ((isInTitle || isInDescription) && isInCite) {
                            var anchor = item.querySelector('div.r > a');
                            if (anchor) {
                                var job_1 = {
                                    visited: false,
                                    element: item
                                };
                                item.setAttribute('style', "background-color: #0f07;");
                                anchor.addEventListener('click', function () {
                                    if (!isRestNow) {
                                        job_1.visited = true;
                                        item.setAttribute('style', "background-color: #00f7;");
                                        getRest();
                                        // TODO fetch about job
                                    }
                                });
                                jobs.push(job_1);
                            }
                        }
                    });
                }
            }
        });
    }
}
