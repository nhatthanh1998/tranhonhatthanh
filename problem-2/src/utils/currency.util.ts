
/**
Exchange the currency value to USDT
 * @param {amount} number is the amount of currency want to exchange
   @param {rate} number the rate of 2 currency. example: 0.5. => 1 currency A = 0.5 currency B

*/

export function exchangeCurrency(amount: number, rate: number, fixedNumber: number): number {
    return parseFloat((amount * rate).toFixed(fixedNumber))
}

/**
Get the rate of 2 currency rate and get most 5 digit.
Output: rate of 2 currency
Idea: 1 ETH = 5.50 BNB 
*/
export function calculateCurrencyRate(leftCurrency: number, rightCurrency: number) : number {
    return parseFloat((leftCurrency / rightCurrency).toFixed(5))
}