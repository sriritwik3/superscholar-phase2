import axios from 'axios';
const URL = 'https://jsonmock.hackerrank.com/api/articles?';

const fetchArticles = async() => {
    let temp = [];
    const res = await axios.get(`${URL}page=1`);
    const total_pages = res.data.total_pages;
    let cnt = 0;
    res.data.data.map((o) => {
        let obj = { title: '', comments: 0 };
        if (o.title) temp.push({ title: o.title, comments: o.num_comments });
        else if (o.story_title)
            temp.push({ title: o.story_title, comments: o.num_comments });
        else cnt++;
    });
    for (let i = 2; i <= total_pages; i++) {
        const newRes = await axios.get(`${URL}page=${i}`);
        newRes.data.data.map((o) => {
            let obj = { title: '', comments: 0 };
            if (o.title) temp.push({ title: o.title, comments: o.num_comments });
            else if (o.story_title)
                temp.push({ title: o.story_title, comments: o.num_comments });
            else cnt++;
        });
    }
    return temp;
};

const fetchedArticles = await fetchArticles();

export default await fetchedArticles;