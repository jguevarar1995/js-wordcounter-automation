import { actorInTheSpotlight,Answerable, Duration, MetaQuestionAdapter, Wait } from '@serenity-js/core'
import { isVisible,PageElement } from '@serenity-js/web'
import { Click,Enter,Text } from '@serenity-js/web';

import { customConstants } from '../constants/customConstants';

export const enterValue = async (element: MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>>, value: Answerable<string | number | string[] | number[]>, timeOut = customConstants.elementDefaultTimeOut): Promise<any> => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(element, isVisible())
    return Enter.theValue(value).into(element)
}

export const click = async (element: MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>>, timeOut = customConstants.elementDefaultTimeOut): Promise<any> => {
    Wait.upTo(Duration.ofSeconds(timeOut)).until(element, isVisible())
    return Click.on(element)
}

export const getText = async(element: MetaQuestionAdapter<PageElement<unknown>, PageElement<unknown>>): Promise<any> => {
    return await actorInTheSpotlight().answer(Text.of(element))
}