export type IGenre = {
    id: number
    name: string
    type: 'movie' | 'tv'
}

type IGenreList = {
  list: IGenre[],
  sorted?: IGenre[]
}

type IGenres = {
    movie: IGenreList
    tv: IGenreList
    [key: string]: IGenreList
}

const filmes: IGenreList = {
  list: [
      {
        "id": 28,
        "name": "Ação",
        "type": 'movie'
      },
      {
        "id": 12,
        "name": "Aventura",
        "type": 'movie'
      },
      {
        "id": 16,
        "name": "Animação",
        "type": 'movie'
      },
      {
        "id": 35,
        "name": "Comédia",
        "type": 'movie'
      },
      {
        "id": 80,
        "name": "Crime",
        "type": 'movie'
      },
      {
        "id": 99,
        "name": "Documentário",
        "type": 'movie'
      },
      {
        "id": 18,
        "name": "Drama",
        "type": 'movie'
      },
      {
        "id": 10751,
        "name": "Família",
        "type": 'movie'
      },
      {
        "id": 14,
        "name": "Fantasia",
        "type": 'movie'
      },
      {
        "id": 36,
        "name": "História",
        "type": 'movie'
      },
      {
        "id": 27,
        "name": "Terror",
        "type": 'movie'
      },
      {
        "id": 10402,
        "name": "Música",
        "type": 'movie'
      },
      {
        "id": 9648,
        "name": "Mistério",
        "type": 'movie'
      },
      {
        "id": 10749,
        "name": "Romance",
        "type": 'movie'
      },
      {
        "id": 878,
        "name": "Ficção científica",
        "type": 'movie'
      },
      {
        "id": 10770,
        "name": "Cinema TV",
        "type": 'movie'
      },
      {
        "id": 53,
        "name": "Thriller",
        "type": 'movie'
      },
      {
        "id": 10752,
        "name": "Guerra",
        "type": 'movie'
      },
      {
        "id": 37,
        "name": "Faroeste",
        "type": 'movie'
      }
] }


const series: IGenreList = {
  list: [
      {
        "id": 10759,
        "name": "Action & Adventure",
        "type": 'tv'
      },
      {
        "id": 16,
        "name": "Animação",
        "type": 'tv'
      },
      {
        "id": 35,
        "name": "Comédia",
        "type": 'tv'
      },
      {
        "id": 80,
        "name": "Crime",
        "type": 'tv'
      },
      {
        "id": 99,
        "name": "Documentário",
        "type": 'tv'
      },
      {
        "id": 18,
        "name": "Drama",
        "type": 'tv'
      },
      {
        "id": 10751,
        "name": "Família",
        "type": 'tv'
      },
      {
        "id": 10762,
        "name": "Kids",
        "type": 'tv'
      },
      {
        "id": 9648,
        "name": "Mistério",
        "type": 'tv'
      },
      {
        "id": 10763,
        "name": "News",
        "type": 'tv'
      },
      {
        "id": 10764,
        "name": "Reality",
        "type": 'tv'
      },
      {
        "id": 10765,
        "name": "Sci-Fi & Fantasy",
        "type": 'tv'
      },
      {
        "id": 10766,
        "name": "Soap",
        "type": 'tv'
      },
      {
        "id": 10767,
        "name": "Talk",
        "type": 'tv'
      },
      {
        "id": 10768,
        "name": "War & Politics",
        "type": 'tv'
      },
      {
        "id": 37,
        "name": "Faroeste",
        "type": 'tv'
      }
] }


const genres: IGenres = {
    tv: series,
    movie: filmes
}

export default genres