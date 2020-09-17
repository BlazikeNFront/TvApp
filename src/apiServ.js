
export const getShows = (inputData)=>{
    fetch(`http://api.tvmaze.com/search/shows?q=${inputData}`)
    .then(data => data.json())
    .then(data => console.log(data))
} 

export const getShowById = (id) => {
    fetch(`http://api.tvmaze.com/shows/${id}?embed=cast`)
    .then(data => data.json())
    .then(data => console.log(data))
}