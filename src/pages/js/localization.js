function loadTranslations(lang) {
    fetch(`/_locales/${lang}/messages.json`)
        .then((response) => response.json())
        .then((translations) => {
            const elements = document.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title], template');
            elements.forEach((element) => {
                if (element.tagName === 'TEMPLATE') {
                    // Handle template element
                    const content = element.content;
                    const templateElements = content.querySelectorAll('[data-i18n], [data-i18n-placeholder], [data-i18n-title]');
                    templateElements.forEach((templateElement) => {
                        replaceTranslation(templateElement, translations);
                    });
                } else {
                    // Handle non-template element
                    replaceTranslation(element, translations);
                }
            });

            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl)
            })
        });
}

function replaceTranslation(element, translations) {
    if (element.hasAttribute('data-i18n')) {
        const key = element.getAttribute('data-i18n');
        const translation = translations[key];
        if (translation && translation.message) {
            element.innerHTML = translation.message;
        }
    }
    if (element.hasAttribute('data-i18n-placeholder')) {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = translations[key];
        if (translation && translation.message) {
            element.setAttribute('placeholder', translation.message);
        }
    }
    if (element.hasAttribute('data-i18n-title')) {
        const key = element.getAttribute('data-i18n-title');
        const translation = translations[key];
        if (translation && translation.message) {
            element.setAttribute('title', translation.message);
        }
    }
}
loadTranslations('zh_CN');
setTimeout(() => loadTranslations('zh_CN'), 1000);