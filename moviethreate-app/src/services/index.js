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
//fetch faborite movie
export const fetchFavMovieApi = async(url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM'
        }
    })
    const data = await response.json();
    if(data.results){
        return data.results;
    }
}
//favourite movie list
export const postFavMovie = async(url,movieId) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    console.log("post api :",apiPath)
    const response = await fetch(apiPath,{
        method:"POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM",
        },
        body: JSON.stringify({media_type: 'movie', media_id: `${movieId}`, favorite: true}),
    })
    const data = await response.json()
    if(data){
        return data;
    }

}
export const deleteFavMovie= async(url,movieId) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    console.log("deleted api :",apiPath)
    const response = await fetch(apiPath,{
        method:"POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM",
        },
        body: JSON.stringify({media_type: 'movie', media_id: `${movieId}`, favorite: false}),
    })
    const data = await response.json()
    if(data){
        return data;
    }

}
//watch movie list
export const postwatchMovie = async(url,movieId) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    console.log("post api :",apiPath)
    const response = await fetch(apiPath,{
        method:"POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM",
        },
        body: JSON.stringify({media_type: 'movie', media_id: `${movieId}`, watchlist: true}),
    })
    const data = await response.json()
    if(data){
        console.log("added in watchlist",data)
        return data;
    }

}
export const deletewatchMovie= async(url,movieId) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    console.log("deleted api :",apiPath)
    const response = await fetch(apiPath,{
        method:"POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM",
        },
        body: JSON.stringify({media_type: 'movie', media_id: `${movieId}`, watchlist: false}),
    })
    const data = await response.json()
    if(data){
        console.log("deleted in watchlist",data)
        return data;
    }

}
//fetching watch list movie
export const fetchWatchListApi = async(url) =>{
    const apiPath = `${apiURL}${url}${keyAPI}`;
    const response = await fetch(apiPath,{
        method:'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2U3YmQzYzY5YTA4NWFlZWIxNGU5MGRjY2YyM2RmZSIsInN1YiI6IjY1YmI5YTdjZTE4Yjk3MDE3YjlhMWNhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.McH6PQ9z5EXcvzgOskjifiL3B5aqAC_5Vzu_tlciZaM'
        }
    })
    const data = await response.json();
    if(data.results){
        return data.results;
    }
}