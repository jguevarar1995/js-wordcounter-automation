import { MetaQuestionAdapter } from '@serenity-js/core'
import { By, PageElement } from '@serenity-js/web'

export const mainPageUi = {
    wordCountValueItem: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.xpath('//span[@id="word_count"]')).describedAs('the word count value item'),
    wordTextInputArea: (): MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>> =>
        PageElement.located(By.id('box')).describedAs('the text area to input words')
}