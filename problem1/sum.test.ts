import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './sum'

describe('Testing function A', () => {
    describe('it should return sum to n', () => {
        test('return 15 when n = 5', () => {
            expect(sum_to_n_a(5)).toBe(15);
        });
        test('return 3 when n = 2', () => {
            expect(sum_to_n_a(2)).toBe(3);
        });
        test('return error message when n <= 0', () => {
            expect(sum_to_n_a(0)).toBe('Number less than 0 not accept');
        });
        test('return error message when n is a float number', () => {
            expect(sum_to_n_a(1.5)).toBe('Number must be integer');
        });
    })
})

describe('Testing function B', () => {
    describe('it should return sum to n', () => {
        test('return 15 when n = 5', () => {
            expect(sum_to_n_b(5)).toBe(15);
        });
        test('return 3 when n = 2', () => {
            expect(sum_to_n_b(2)).toBe(3);
        });
        test('return error message when n <= 0', () => {
            expect(sum_to_n_b(0)).toBe('Number less than 0 not accept');
        });
        test('return error message when n is a float number', () => {
            expect(sum_to_n_b(1.5)).toBe('Number must be integer');
        });
    })
})

describe('Testing function C', () => {
    describe('it should return sum to n', () => {
        test('return 15 when n = 5', () => {
            expect(sum_to_n_c(5)).toBe(15);
        });
        test('return 3 when n = 2', () => {
            expect(sum_to_n_c(2)).toBe(3);
        });
        test('return error message when n <= 0', () => {
            expect(sum_to_n_c(0)).toBe('Number less than 0 not accept');
        });
        test('return error message when n is a float number', () => {
            expect(sum_to_n_c(1.5)).toBe('Number must be integer');
        });
    })
})