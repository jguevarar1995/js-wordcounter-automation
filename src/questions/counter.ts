import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight,TestCompromisedError } from '@serenity-js/core'

import { getText } from '../helpers/actions'
import { mainPageUi } from '../ui/mainPageUi'

export const counter = {
    checkWordsCount : async(expectedWords: string, currentCount: string) : Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(expectedWords, equals(currentCount))
                .otherwiseFailWith(TestCompromisedError, `The current words: ${currentCount} is not equal to expeted count: ${expectedWords}`)
        )
    }, 
    getWordsCount : async() : Promise<string> => {
        return await getText(mainPageUi.wordCountValueItem())
    },
}