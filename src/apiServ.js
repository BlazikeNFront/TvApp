
export const getShows = (inputData)=>{
   return fetch(`http://api.tvmaze.com/search/shows?q=${inputData}`)
    .then(data => data.json())
    
    
    
} 

export const getShowById = (id) => {
   return fetch(`http://api.tvmaze.com/shows/${id}?embed=cast`)
    .then(data => data.json());
    
}