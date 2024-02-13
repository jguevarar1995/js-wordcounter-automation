import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight,TestCompromisedError } from '@serenity-js/core'

import { getText } from '../helpers/actions'
import { mainPageUi } from '../ui/mainPageUi'

export const counter = {
    checkCount : async(expectedCountValue: string, currentCountValue: string, type: string) : Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(expectedCountValue, equals(currentCountValue))
                .otherwiseFailWith(TestCompromisedError, `The current ${type} count: ${currentCountValue} is not equal to expeted count: ${expectedCountValue}`)
        )
    },
    getCount : async(type: string) : Promise<string> => {
        return await getText(mainPageUi.countValueItem(type))
    }
}