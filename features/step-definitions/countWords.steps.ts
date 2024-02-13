import { Given, Then, When } from '@cucumber/cucumber'
import { Actor } from '@serenity-js/core'
import { Navigate } from '@serenity-js/web'

import { actorMemories } from '../../src/constants/actorMemories';
import { customConstants } from '../../src/constants/customConstants';
import { recall, remember } from '../../src/helpers/actorMemory';
import { counter } from '../../src/questions/counter';
import { count } from '../../src/tasks/count';
import { getWordMetadata } from '../../src/util/word';
import { generateWords } from '../../src/util/wordGenerator';
import { stepTimeOut } from '../support/configs'

Given('{actor} opens the WordCounter website', stepTimeOut, async (actor: Actor) => {
    await actor.attemptsTo(
        Navigate.to(customConstants.mainPage)
    )
});

When('he enters the text {string}', stepTimeOut, async (message: string) => {
    await count.with(message)
    await remember(actorMemories.INITIAL_MESSAGE, message)
});

When('he enters a random text', stepTimeOut, async () => {
    const message = generateWords.from()
    await count.with(message)
    const initialCounting = await counter.getCount(customConstants.wordCountElementReference)
    await remember(actorMemories.WORD_COUNT, initialCounting)
    await remember(actorMemories.INITIAL_MESSAGE, message)
});

When('he {string} words in text', stepTimeOut, async (option: string) => {
    const initialMessage = await recall(actorMemories.INITIAL_MESSAGE)
    const wordQuantity = await count.updateInfo(option, initialMessage)
    await remember(actorMemories.UPDATED_COUNTER, wordQuantity)
});

Then('the word count should be updated successfully', stepTimeOut, async () => {
    const initialCounting = await recall(actorMemories.WORD_COUNT)
    const updatedCounter = await recall(actorMemories.UPDATED_COUNTER)

    const currentCount = await counter.getCount(customConstants.wordCountElementReference)

    const calculatedWordChangeQuantity = getWordMetadata.getQuantityChanged(initialCounting, updatedCounter)

    await counter.checkCount(calculatedWordChangeQuantity, currentCount, customConstants.wordTypeTest)
});

Then('the word count should be {string}', stepTimeOut, async (expectedWords: string) => {
    const currentCount = await counter.getCount(customConstants.wordCountElementReference)
    await counter.checkCount(expectedWords, currentCount, customConstants.wordTypeTest)
});

Then('the keyword density is calculated successfully', stepTimeOut, async () => {
    const initialMessage = await recall(actorMemories.INITIAL_MESSAGE)
    const wordFrequencyValues = getWordMetadata.calculateWordFrecuencyInText(initialMessage)

    const kwdDensityEntries = getWordMetadata.generateKeywordDensityEntries(await counter.getKeywordDensityData(customConstants.wordTypeTest),
        await counter.getKeywordDensityData(customConstants.keywordDensityBadge))

    await counter.verifyKewordDensityValues(kwdDensityEntries, wordFrequencyValues)

});

Then('the character count should be {string}', stepTimeOut, async (expectedChars: string) => {
    const currentCount = await counter.getCount(customConstants.characterCountElementReference)
    await counter.checkCount(expectedChars, currentCount, customConstants.characterTypeTest)
});