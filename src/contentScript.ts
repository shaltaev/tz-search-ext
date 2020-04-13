if (window && window.location.href.includes('google')) {
    const inputEl: HTMLInputElement | undefined =
        document.querySelector<HTMLInputElement>('input[aria-label="Search"]') ||
        document.querySelector<HTMLInputElement>('input[aria-label="Найти"]') ||
        undefined

    if (inputEl?.value !== '') {
        const searchEl: HTMLDivElement | undefined =
            document.querySelector<HTMLDivElement>('div#search') || undefined

        if (searchEl) {
            const items = document.querySelectorAll('div.g')
            items.forEach((item) => {
                const title = item.querySelector<HTMLHeadingElement>('h3')
                const description = item.querySelector<HTMLSpanElement>('span.st')

                chrome.storage.sync.get('toGoField', (data) => {
                    const search = data.toGoField || ''
                    if (
                        search.length > 1 && (
                            title?.innerText.toLowerCase().includes(search.toLowerCase()) ||
                            description?.innerText
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                    ) {
                        const anchor = item.querySelector<HTMLAnchorElement>('div.r > a')

                        if (anchor) {
                            anchor.click()
                        }
                    }
                })

            })
        }
    }
}
