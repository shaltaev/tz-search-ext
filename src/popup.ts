const keywordInputEl = document.querySelector<HTMLInputElement>('input#keyword__field')
const urlInputEl = document.querySelector<HTMLInputElement>('input#url__field')

if (keywordInputEl) {
    chrome.storage.sync.get('keyword', (data) => {
        keywordInputEl.value = data.keyword || ''
    })

    keywordInputEl.addEventListener('input', (ev) => {
        chrome.storage.sync.set({'keyword': (ev as any).target.value || ''})
    })
}

if (urlInputEl) {
    chrome.storage.sync.get('url', (data) => {
        urlInputEl.value = data.url || ''
    })

    urlInputEl.addEventListener('input', (ev) => {
        chrome.storage.sync.set({'url': (ev as any).target.value || ''})
    })
}