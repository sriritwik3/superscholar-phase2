import topArticles from '../utils/topArticles';

describe("let's test", () => {
    test('somthing', () => {
        const data = topArticles(2);
        expect(data).toEqual([
            'UK votes to leave EU',
            'F.C.C. Repeals Net Neutrality Rules',
        ]);
    });
});