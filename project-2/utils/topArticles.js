import fetchedArticles from './fetchArticles.js';


const topArticles = (limit) => {
    fetchedArticles.sort(function(a, b) {
        if (a.comments == b.comments) {
            return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
        }
        return a.comments < b.comments ? 1 : -1;
    });
    let ans = [];
    fetchedArticles.map((data) => {
        ans.push(data.title);
    });
    return ans.slice(0, limit);
};


export default topArticles;