import { CustomError } from '../helpers/customError'

export const getWordMetadata = {
    wordListInMessage: (message: string): string[] =>
        message.match(/\b\w+\b/g),

    wordQuantity: (words: string[]): string =>
        words.length.toString(),

    parseValueToNumber: (quantity: string): number =>
        Number.parseInt(quantity.match(/^\d+/)![0]),

    calculateWordChangeQuantity: (operationValue: string, initialQuantityValue: number): string => {
        const operationType = operationValue.match(/^\d+\s+(\w+)/)?.[1]
        const wordQuantityValue: number = getWordMetadata.parseValueToNumber(operationValue)
        return operationType == 'added' ? (initialQuantityValue + wordQuantityValue).toString()
            : (initialQuantityValue - wordQuantityValue).toString()
    },

    getQuantityChanged: (initialCounting: string, wordQuantity: string): string => {
        const initialQuantityValue: number = getWordMetadata.parseValueToNumber(initialCounting)

        return getWordMetadata.calculateWordChangeQuantity(wordQuantity, initialQuantityValue)

    },
    calculateWordFrecuencyInText(text: string): [string, number][] {
        try {
            const wordsInText = getWordMetadata.wordListInMessage(text)
            const wordFrequency = wordsInText.filter(wordToEvaluate => wordToEvaluate !== 'and')
                .reduce((frequency, wordToEvaluate) => {
                    frequency[wordToEvaluate] = (frequency[wordToEvaluate] || 0) + 1;
                    return frequency;
                }, {} as Record<string, number>)
            const wordFrequencyEntries = Object.entries(wordFrequency)

            wordFrequencyEntries.sort((a, b) => b[1] - a[1])

            return wordFrequencyEntries
        } catch (error) {
            throw new CustomError('The text is empty and we can not calculate the word frequency', error)
        }

    },
    generateKeywordDensityEntries(words: string[], badges: string[]): [string, number][] {
        try {
            const parsedBadges = badges.map(item => getWordMetadata.parseValueToNumber(item))
            const kwdDensityValues = words.reduce((accumulator, key, index) => {
                accumulator[key] = parsedBadges[index];
                return accumulator;
            }, {} as Record<string, number>)

            const kwdDensityEntries = Object.entries(kwdDensityValues)

            return kwdDensityEntries
        } catch (error) {
            throw new CustomError('The text is empty and we can not generate all the keyword density entries', error)
        }
    }

}