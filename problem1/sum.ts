// Method 1: Create an array of n number and sum all
export function sum_to_n_a(n: number): number | string {
    if (n <= 0) {
        return 'Number less than 0 not accept'
    }
    if (!Number.isInteger(n)) {
        return 'Number must be integer'
    }
    let sum = 0
    let arr = [...Array(n).keys()].map(i => i + 1)
    for (let i of arr) {
        sum += i
    }
    return sum
}

// Method 2: Use for loop
export function sum_to_n_b(n: number): number | string {
    if (n <= 0) {
        return 'Number less than 0 not accept'
    }
    if (!Number.isInteger(n)) {
        return 'Number must be integer'
    }
    let sum = 0
    for (let i = 1; i < n + 1; i++) {
        sum += i
    }
    return sum
}

// Method 3: Use while loop
export function sum_to_n_c(n: number): number | string {
    if (n <= 0) {
        return 'Number less than 0 not accept'
    }
    if (!Number.isInteger(n)) {
        return 'Number must be integer'
    }
    let sum = 0, i = 1;
    // looping from i = 1 to number
    while (i < n + 1) {
        sum += i;
        i++;
    }
    return sum;
}