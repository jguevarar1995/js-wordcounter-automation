import { actorInTheSpotlight,Duration, Wait } from '@serenity-js/core'
import { isVisible } from '@serenity-js/web'

import { enterValue } from '../helpers/actions'
import { mainPageUi } from '../ui/mainPageUi'

export const countWords = {
    with : async (message: string): Promise<void> => {
        await actorInTheSpotlight().attemptsTo(
            await enterValue(mainPageUi.wordTextInputArea(), message),
            Wait.upTo(Duration.ofSeconds(59))
                .until(mainPageUi.wordCountValueItem(), isVisible())
        )
    }
}