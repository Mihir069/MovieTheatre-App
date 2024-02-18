import { apiURL } from '../config';
export const getSearchResult = (url, query) => {
    const apiPath = `${apiURL}${url}&query=${query}`;
    fetch(apiPath, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
       return(data.results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};

