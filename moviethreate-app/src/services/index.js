import { apiURL } from '../config';
import { keyAPI } from '../config';

export const getSearchResult = async (url,query)=>{
    const apiPath = `${apiURL}${url}&query=${query}`;
    console.log("search",apiPath)
    const response = await fetch(apiPath,{
        method:"GET",
    })
    const data = await response.json();

    if(data.results){
        const results = data.results.map((items)=>({
            id:items.id,
            poster_path:items.poster_path || items.backdrop_path,
            title:items.original_name|| items.original_title
        }));
        return results;
    }
    return [];
}

export const fetchApiData =  async (url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:'GET',
    });
    const data = await response.json();

    if (data.results) {
        const results = data.results.map((item) => ({
            id: item.id,
            title: item.original_title || item.original_name,
            poster: item.poster_path,
            release_date: item.release_date,
            ratings: item.vote_average,
            genre: item.genre_ids,
        }));

        return results;
       
    }
    return [];
}

export const fetchDetailApi = async (url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:'GET',
    });
    const data = await response.json()
    if(data){
        return data;
    }
}

export const fetchGenreApi = async(url)=>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:"GET",
    })
    const data = await response.json();
    if(data){
        return data;
    }
}

export const fetchUserApi = async(url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:"GET",
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM'
          }
    })
    const data  = await response.json();
    if(data){
        return data;
    }
}