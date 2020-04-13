const inputEl = document.querySelector<HTMLInputElement>('input#text_to_auto_go__field')

if (inputEl) {
    chrome.storage.sync.get('toGoField', (data) => {
        inputEl.value = data.toGoField || ''
    })

    inputEl.addEventListener('input', (ev) => {
        chrome.storage.sync.set({'toGoField': (ev as any).target.value || ''})
    })
}
