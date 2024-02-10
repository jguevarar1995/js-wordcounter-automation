import { defineParameterType } from '@cucumber/cucumber';
import { actorCalled } from '@serenity-js/core';

defineParameterType({
    regexp: /[A-Z][a-z]+/,
    transformer(name: string) {
        return actorCalled(name);
    },
    name: 'actor',
});