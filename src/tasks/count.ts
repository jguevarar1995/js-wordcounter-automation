import { actorInTheSpotlight,Duration, Wait } from '@serenity-js/core'
import { isVisible, Key } from '@serenity-js/web'

import { click, enterValue, pressKeyInElement } from '../helpers/actions'
import { mainPageUi } from '../ui/mainPageUi'
import { getWordMetadata } from '../util/word'
import { generateWords } from '../util/wordGenerator'

export const count = {
    with : async (message: string): Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            await enterValue(mainPageUi.wordTextInputArea(), message.trim()),
            Wait.upTo(Duration.ofSeconds(59))
                .until(mainPageUi.countValueItem('word'), isVisible())
        )
    },
    updateInfo: async (option: string, message: string): Promise<string> => {
        return option === 'adds' ? await count.addWordsToText() : await count.removeWordFromText(message)
    },
    addWordsToText: async (): Promise<string> => {
        const message = generateWords.from()
        await actorInTheSpotlight().attemptsTo(await pressKeyInElement(Key.Enter, mainPageUi.wordTextInputArea()))
        await count.with(message)

        return `${getWordMetadata.wordQuantity(getWordMetadata.wordListInMessage(message))} added`
    },
    removeWordFromText: async (message: string): Promise<string> => {
        const wordsInMessage = getWordMetadata.wordListInMessage(message)
        const wordQuantity = Number.parseInt(getWordMetadata.wordQuantity(wordsInMessage))
        const wordsRemaining = Math.floor(Math.random() * (wordQuantity - 1)) + 1
        const message1 = wordQuantity <= 1 ? '' : wordsInMessage.slice(0, wordsRemaining).join(' ')

        const difference = wordQuantity === wordsRemaining ? 1 : wordQuantity - wordsRemaining

        await actorInTheSpotlight().attemptsTo( 
            await click(mainPageUi.clearButton()),
            await enterValue(mainPageUi.wordTextInputArea(), message1)
        )
        return `${difference} removed`
    }
}