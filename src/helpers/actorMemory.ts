import { actorInTheSpotlight, notes } from '@serenity-js/core';

export const remember = async (name: string, value: unknown): Promise<void> => {
    actorInTheSpotlight().attemptsTo(notes().set(name, value));
};

export const recall = async (name: string): Promise<any> => {
    return notes().get(name).answeredBy(actorInTheSpotlight())
};