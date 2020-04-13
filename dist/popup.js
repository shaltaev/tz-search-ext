"use strict";
var inputEl = document.querySelector('input#text_to_auto_go__field');
if (inputEl) {
    chrome.storage.sync.get('toGoField', function (data) {
        inputEl.value = data.toGoField || '';
    });
    inputEl.addEventListener('input', function (ev) {
        chrome.storage.sync.set({ 'toGoField': ev.target.value || '' });
    });
}
