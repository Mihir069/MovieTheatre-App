import { apiURL } from '../config';
import { keyAPI } from '../config';
export const getSearchResult = (url, query) => {
    const apiPath = `${apiURL}${url}&query=${query}`;
    console.log("search",apiPath)
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

export const fetchApiData =  async (url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
  //  console.log("api",apiPath)
  const response = await fetch(apiPath,{
        method:'GET',
    });
    const data = await response.json();

    if (data.results.length > 0) {
        const results = data.results.map((item) => ({
            id: item.id,
            title: item.original_title || item.original_name,
            poster: item.backdrop_path,
            release_date: item.release_date,
            ratings: item.vote_average,
            genre: item.genre_ids,
        }));

        return results;
       
    }
    return [];
}

export const fetchDetailApi = (url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    console.log("movieId",apiPath)
    fetch(apiPath,{
        method:'GET',
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        return data
    })
}