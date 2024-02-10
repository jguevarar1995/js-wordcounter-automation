import { Given, Then, When } from '@cucumber/cucumber'
import { Actor } from '@serenity-js/core'
import { Navigate } from '@serenity-js/web'

import { counter } from '../../src/questions/counter';
import { countWords } from '../../src/tasks/countWords';
import { stepTimeOut } from '../support/configs'

Given('{actor} opens the WordCounter website', stepTimeOut, async (actor: Actor) => {
    await actor.attemptsTo(
        Navigate.to('/')
    )
});

When('he enters the text {string}', stepTimeOut, async (message: string) => {
    await countWords.with(message)
});

Then('the word count should be {string}', stepTimeOut, async (expectedWords: string) => {
    const currentCount = await counter.getWordsCount()
    await counter.checkWordsCount(expectedWords, currentCount)
});