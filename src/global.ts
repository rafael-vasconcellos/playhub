const API_KEY = process.env.API_KEY as string


export const ProductionDetailsSchema = { 
    id: 0,
    title: '',
    name: '',
    original_title: '',
    original_name: '',
    vote_average: 0,
    vote_count: 0,
    popularity: 1000,
    runtime: 0,
    release_date: '',
    status: '',
    tagline: '',
    genres: [{name: 'genre1', id: 0}, {name: 'genre2', id: 0}],
    adult: null,
    overview: '',
    poster_path: '',
    backdrop_path: '',
    seasons: [],
    videos: {results: []},
    images: {results: []},
    recommendations: {results: []},
    similar: {results: []},
    reviews: {results: []},
    credits: undefined
  
}


type IProductionSchema = typeof ProductionDetailsSchema

type ITrendigs = {
    "genre_ids": number[],
    "original_language": string,
    "media_type": string,
    "vote_count": number
}

export type IProductionCompanies = {
    id: number
    name: string
    origin_country: string
    logo_path: string
}

export type IProductionDetails = IProductionSchema & ITrendigs & {
    credits: any
    production_companies: IProductionCompanies[]
}

export type IDetailsResumed = {
    "id": number
    "original_language": string
    "original_title": string
    "overview": string
    "popularity": number
    "poster_path": string
    "release_date": string
    "title": string
    "video": boolean
    "vote_average": number
    "vote_count": number

    "adult": boolean
    "backdrop_path": string
    "genre_ids": number[]

    name: string
    original_name: string
    media_type: string
}

export type IDiscover = {
    page: number
    total_pages: number
    total_results: number
    results: IDetailsResumed[]
}

export type IPageProps = { 
    params: {
        [key: string]: string | undefined
    }
    searchParams?: {
        [key: string]: string | undefined
    }
}


/*
    type Content = { 
    genres: {name: string, id: number | string}[],
    runtime: number,
    production_companies: {name: string}[]

    id: number | null,
    title: string,
    name: string,
    original_title: string,
    original_name: string,
    adult: boolean,
    overview: string,
    vote_average: number | string,
    popularity: number | string,
    release_date: string,
    poster_path: string,
    backdrop_path: string,
    video: string,
}

*/


const CACHE_POLICY = {
    headers: { "Authorization": API_KEY }, 
    next: { revalidate: 60 * 60 * 3 }
}

const NO_CACHE = {
    headers: { 
        "Authorization": API_KEY, 
        "Cache-Control": 'no-store'
    }
}

export function prodTypeValidate(type: string | undefined) { 
    if (type === 'tv' || type === 'movie') { return type } 
    else { return false }
}

export function strip(s: string | undefined) { 
    return s?.toLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll(",", "").replaceAll('?', '').
    replaceAll('!', '').replaceAll('-', '')
}

async function fetchData(url: string, init: RequestInit) {
    return await fetch(url, init).then(response => response.json())
}

// /api/production/images
export async function get_images(id: number) {
    return await fetchData(`https://api.themoviedb.org/3/movie/${id}/images`, NO_CACHE)
}

// /api/production/season
export async function get_season(id: number, season_number: number) { 
    return await fetchData(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=pt-BR`, NO_CACHE)
}

// /api/production/details
export async function production_details(
    id: number | undefined, 
    type: string | undefined, 
    append?: string | undefined, 
    cache?: boolean | RequestInit
    ) { 

    append = append ?? ''
    cache = cache? CACHE_POLICY : NO_CACHE
    return await fetchData(`https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`+append, cache)
}

// 10min
// /api/discover
export async function discover(genreId: number, type: string) { 
    return await fetchData(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${genreId}`, CACHE_POLICY)
    .then(res => res?.results)
}

// 10min
// /api/trending
export async function trending() {
    return await fetchData(`https://api.themoviedb.org/3/trending/all/day?language=pt-BR`, CACHE_POLICY)
}






















export async function route_search(type: string, queryname: string) { 
    return await fetchData(
        `https://api.themoviedb.org/3/search/${type}?query=${queryname}&include_adult=true&language=pt-BR&page=1`, 
        NO_CACHE
    ).then(res => { 
  
        if ((res.results?.length ?? 0) > 0 && queryname) { 
            let arr:any[] = []
            for (let indice of res.results) { 
                let title: string | undefined = indice?.title ?? indice?.name
                let original: string | undefined = indice?.original_title ?? indice?.original_name
                title = strip(title)
                original = strip(original)
                if ( title === queryname || original === queryname ) { 
                  arr.push(indice)
                } 
            }
  
            if (arr.length > 0 ) {return arr[0]} else {console.log(arr)}
  
  
        }
  
    } )
}

async function query(url: string, type: string) {
    return await fetchData(url, CACHE_POLICY)
    .then(res => { 
        if ( (res.results?.length ?? 0) > 0 ) {
            res?.results?.forEach( (indice:any) => {indice.type = type} )
            return res
        } else {
            return {}
        }

    } )
}

// /api/search
export async function search(
        queryname: string | number, 
        type: string, 
        page: number
    ) {

    return await query(`https://api.themoviedb.org/3/search/${type}?query=${queryname}&include_adult=true&language=pt-BR&page=${page}`, type)
}

// 10min
export async function search_genre(
        genreId: number, 
        type: string, 
        page: number
    ) { 

    return await query(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`, type)
}