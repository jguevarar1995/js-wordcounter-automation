import { faker } from '@faker-js/faker';

export const generateWords = {
    from : (): string => 
        faker.word.words({ count: { min: 1, max: 10 } })
}