"use strict";
var keywordInputEl = document.querySelector('input#keyword__field');
var urlInputEl = document.querySelector('input#url__field');
if (keywordInputEl) {
    chrome.storage.sync.get('keyword', function (data) {
        keywordInputEl.value = data.keyword || '';
    });
    keywordInputEl.addEventListener('input', function (ev) {
        chrome.storage.sync.set({ 'keyword': ev.target.value || '' });
    });
}
if (urlInputEl) {
    chrome.storage.sync.get('url', function (data) {
        urlInputEl.value = data.url || '';
    });
    urlInputEl.addEventListener('input', function (ev) {
        chrome.storage.sync.set({ 'url': ev.target.value || '' });
    });
}
