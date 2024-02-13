import { MetaQuestionAdapter } from '@serenity-js/core'
import { By, PageElement } from '@serenity-js/web'

export const mainPageUi = {
    clearButton: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id('clear-btn')).describedAs('the clear button'),
    countValueItem: (type: string): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> => {
        const elementIdType = type == 'word' ? 'word_count' : 'character_count'
        return PageElement.located(By.id(elementIdType)).describedAs(`the ${type} count value item`)
    },
    wordTextInputArea: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id('box')).describedAs('the text area for words')
}