import { Ensure, equals } from '@serenity-js/assertions'
import { actorInTheSpotlight,TestCompromisedError } from '@serenity-js/core'

import { getTextOfAllElements, getTextOfElement } from '../helpers/actions'
import { mainPageUi } from '../ui/mainPageUi'

export const counter = {
    checkCount : async(expectedCountValue: string, currentCountValue: string, type: string) : Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(expectedCountValue, equals(currentCountValue))
                .otherwiseFailWith(TestCompromisedError, `The current ${type} count: ${currentCountValue} is not equal to expeted count: ${expectedCountValue}`)
        )
    },
    getCount : async(type: string) : Promise<string> => {
        return await getTextOfElement(mainPageUi.countValueItem(type))
    },
    getKeywordDensityData: async(type: string) : Promise<string[]> => {
        return await getTextOfAllElements(mainPageUi.keywordDensityItemList(type))
    },
    verifyKewordDensityValues : async(expectedDensityValues: [string, number] [], currentDensityValues: [string, number][]) : Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            Ensure.that(expectedDensityValues, equals(currentDensityValues))
                .otherwiseFailWith(TestCompromisedError, `The current density values: ${currentDensityValues} are not equal to expeted density values: ${expectedDensityValues}`)
        )
    }
}