export const getWordMetadata = {
    wordListInMessage: (message: string): string[] =>
        message.match(/\b\w+\b/g),

    wordQuantity: (words: string[]): string =>
        words.length.toString(),

    parseQuantityValueToNumber: (quantity: string): number =>
        Number.parseInt(quantity.match(/^\d+/)![0]),

    calculateWordChangeQuantity: (operationValue: string, initialQuantityValue: number): string => {
        const operationType = operationValue.match(/^\d+\s+(\w+)/)?.[1]
        const wordQuantityValue: number = getWordMetadata.parseQuantityValueToNumber(operationValue)
        return operationType == 'added' ? (initialQuantityValue + wordQuantityValue).toString()
            : (initialQuantityValue - wordQuantityValue).toString()
    },
        
    getQuantityChanged: (initialCounting: string, wordQuantity: string): string => {
        const initialQuantityValue: number = getWordMetadata.parseQuantityValueToNumber(initialCounting)

        return getWordMetadata.calculateWordChangeQuantity(wordQuantity, initialQuantityValue)

    }
}