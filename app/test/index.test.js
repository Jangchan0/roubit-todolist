describe('jest 테스트', () => {
    (a = 1), (b = 1);

    test('jest', () => {
        expect(a + b).toEqual(2);
    });
});
