interface Job {
    visited: boolean
    element: Element
}

const jobs: Job[] = []
let isRestNow: boolean = false

const getRest = () => {
    isRestNow = true
    const toDo = jobs.filter(j => !j.visited)
    toDo.forEach(j => {
        j.element.setAttribute('style', "background-color: #0ff7;")
    })
    setTimeout(() => {
        toDo.forEach(j => {
            j.element.setAttribute('style', "background-color: #0f07;")
        })
        isRestNow = false
    }, 5000)
}

if (window && window.location.href.includes('google')) {
    const inputEl: HTMLInputElement | undefined =
        document.querySelector<HTMLInputElement>('input[aria-label="Search"]') ||
        document.querySelector<HTMLInputElement>('input[aria-label="Найти"]') ||
        undefined
    if (inputEl?.value !== '') {
        chrome.storage.sync.get(['keyword', 'url'], (data) => {
            const search = data.keyword || ''
            const url = data.url || ''
            if (search.length > 1 && url.length > 1) {
                const searchEl: HTMLDivElement | undefined =
                    document.querySelector<HTMLDivElement>('div#search') || undefined

                if (searchEl) {
                    const items = document.querySelectorAll('div.g')
                    items.forEach((item) => {
                        const title = item.querySelector<HTMLHeadingElement>('h3')
                        const description = item.querySelector<HTMLSpanElement>('span.st')
                        const cite = item.querySelector<HTMLElement>('cite')

                        const isInTitle: boolean = title?.innerText.toLowerCase().includes(search.toLowerCase()) || false
                        const isInDescription: boolean = description?.innerText
                            .toLowerCase()
                            .includes(search.toLowerCase()) || false
                        const isInCite: boolean = cite?.innerText.toLowerCase().includes(url.toLowerCase()) || false

                        if ((isInTitle || isInDescription) && isInCite ) {
                            const anchor = item.querySelector<HTMLAnchorElement>('div.r > a')

                            if (anchor) {
                                const job = {
                                    visited: false,
                                    element: item
                                }
                                item.setAttribute('style', "background-color: #0f07;")
                                anchor.addEventListener('click', () => {
                                    if(!isRestNow) {
                                        job.visited = true
                                        item.setAttribute('style', "background-color: #00f7;")
                                        getRest()
                                        // TODO fetch about job
                                    }
                                })
                                jobs.push(job)
                            }
                        }
                    })
                }
            }
        })
    }
}
