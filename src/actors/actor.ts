import { Actor, actorCalled } from '@serenity-js/core';

export const actor = {
    define: async (actorName: string): Promise<Actor> => {
        const actor = actorCalled(actorName);
        return actor;
    },
};