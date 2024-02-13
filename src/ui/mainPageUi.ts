import { MetaList, MetaQuestionAdapter } from '@serenity-js/core'
import { By, PageElement, PageElements } from '@serenity-js/web'

export const mainPageUi = {
    clearButton: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id('clear-btn')).describedAs('the clear button'),
    countValueItem: (type: string): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id(type)).describedAs(`the ${type} count value item`),
    wordTextInputArea: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id('box')).describedAs('the text area for words'),
    keywordDensityItemList: (type: string): MetaList<PageElement<unknown>, PageElement<unknown>> =>
        PageElements.located(By.xpath(`//a[@class="list-group-item"]//span[@class="${type}"]`)).describedAs(`the list of keyword density ${type}s`)
}