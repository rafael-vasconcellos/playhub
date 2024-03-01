"use client"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import './style.css'
import { DetailsButtons, screen } from "./utils"
import { IProductionDetails, ProductionDetailsSchema } from "@/global"



type detailProps = {type?: string, id?: number}

/*
    está sendo inferido o tipo do generic "T", "U" é uma variável de tipo
    especialmente útil em cenários como tipagem condicional, composição de tipos genéricos e inferência de 
    tipos em callbacks e funções de ordem superior.
*/
type ArrayType<T> = T extends (infer U)[]? U : T

type IGenre = ArrayType<IProductionDetails['genres']>

const ContentSchema = Object.assign(ProductionDetailsSchema, {
    overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, placeat veniam quas dolor facilis soluta, consectetur magnam ut eos architecto similique eius porro amet possimus commodi rerum nesciunt facere eum.',
    vote_average: 7.814,
    popularity: 2947.91,
    runtime: 92,
    release_date: '2022',
} )

const Details: React.FC<detailProps> = function( { type, id } ) { 
    const [ screen_status, setScreen ] = useState( screen.normal )

    const { data: content, remove } = useQuery(`${id} content details`, async() => {
            return await fetch(`/api/production/details?id=${id}&type=${type}`) // &extend=true
            .then(res => { 
              if (res.status === 200) { return res.json() }
              return null
            } )

    }, { staleTime: Infinity, placeholderData: ContentSchema }   )

    const skeleton = !content?.id? 'text-zinc-500 bg-zinc-500 animate-pulse' : ''

    useEffect(() => { 
        if (content === null) { remove() }
    }, [content] )


    return (
        <section className={`${screen_status.popup_bg} details animate-scale z-10 bg-zinc-950/40 flex justify-center items-center cursor-default`}
         onClick={   () => setScreen( () => screen.normal )   }> {/* fundo preto */}
                <div className={`bg-zinc-800 ${screen_status.container} rounded-b-2xl`} 
                 onClick={ (e) => e.stopPropagation() }> {/* container */}


                      {/* banner */}
                      <div className={`${screen_status.banner} ${skeleton} bg-zinc-500 bg-cover w-full`} style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content?.backdrop_path})`} } />
                      <DetailsButtons type={type} content={content} setScreen={setScreen} />


                      <div className="relative">
                          <div className="w-full px-3 py-4"> {/* primeira coluna */}
                                  <div>
                                      {content?.id !== 0 && <span className={`mr-2 font-bold p-1 ${content?.adult? "bg-zinc-950" : "bg-sky-500"} text-zinc-100`}>PG-{content?.adult? "18":"13"}</span> }
                                      <span className={skeleton}> 
                                        { !Number.isNaN(Math.floor(content?.runtime / 60)) ?
                                            Math.floor(content?.runtime/60)+'h' : '' }
                                        {(  content?.runtime%60 !== 0 && !Number.isNaN(content?.runtime % 60)  )? 
                                            content?.runtime%60+'min' : ''}
                                      </span><br/>
                                  </div>

                                  <p className={`my-1 ${skeleton}`}>{content?.release_date?.slice(0, 4)}</p>

                                  <ul className={`flex gap-2 my-2 flex-wrap ${screen_status.stats}`}>
                                          {content?.genres?.map( (e: IGenre) => <li className={skeleton} key={e.id? e.id : Math.random()}> {e.name} </li>)}
                                  </ul>

                                  <div className={`py-2 ${skeleton}`}>Média: {content?.vote_average}<br/>Popularidade: {content?.popularity}</div>
                                  <p className={`${screen_status.more} py-2`}>{content?.overview}</p>
                          </div>


                          {/* segunda coluna */}
                          <div className={`${screen_status.more} absolute top-0 right-0 w-1/2 px-2 py-8 flex flex-col gap-2`}>
                                  <div>
                                      Produção: {content?.production_companies?.map( (e: IGenre) => {
                                          if (content?.production_companies.indexOf(e) !== content?.production_companies.length-1) { 
                                              return`${e.name}, `
                                          } else {
                                              return`${e.name}`
                                          }
                                      } ) }
                                  </div>
                                  <div>
                                      Gêneros: {content?.genres?.map( (e: IGenre) => {
                                          if (content?.genres.indexOf(e) !== content?.genres.length-1) { 
                                              return`${e.name}, `
                                          } else {
                                              return e.name
                                          }
                                      } ) }
                                  </div>
                          </div>
                      </div>

                </div> {/* /container */}
        {/* fundo preto */} </section>
    )
}

export default Details




/*

videos.results[0].key

{
  "adult": false,
  "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
  "belongs_to_collection": null,
  "budget": 100000000,
  "genres": [
    {
      "id": 16,
      "name": "Animação"
    },
    {
      "id": 10751,
      "name": "Família"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 14,
      "name": "Fantasia"
    },
    {
      "id": 35,
      "name": "Comédia"
    }
  ],
  "homepage": "https://cuevana3.it/pelicula/the-super-mario-bros-movie-2023/",
  "id": 502356,
  "imdb_id": "tt6718170",
  "original_language": "en",
  "original_title": "The Super Mario Bros. Movie",
  "overview": "Os irmãos Mario e Luigi, de ascendência italiana, vivem em Brooklyn (Nova Iorque), onde trabalham como canalizadores. Certo dia, durante um serviço de reparação de uma conduta de água, são sugados por um tubo e transportados para o Reino Cogumelo, um universo paralelo governado pela Princesa Peach. Sem saber do paradeiro do irmão, Mario vai ter de aprender a sobreviver naquele lugar, adquirindo capacidades bizarras mas que serão grandes mais-valias para destruir os planos de Bowser, um verdadeiro vilão que tenciona dominar o mundo.",
  "popularity": 2947.91,
  "poster_path": "/ktU3MIeZtuEVRlMftgp0HMX2WR7.jpg",
  "production_companies": [
    {
      "id": 33,
      "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      "name": "Universal Pictures",
      "origin_country": "US"
    },
    {
      "id": 6704,
      "logo_path": "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
      "name": "Illumination",
      "origin_country": "US"
    },
    {
      "id": 12288,
      "logo_path": "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
      "name": "Nintendo",
      "origin_country": "JP"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "JP",
      "name": "Japan"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2023-04-05",
  "revenue": 1308766975,
  "runtime": 92,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Vamos lá!",
  "title": "Super Mario Bros.: O Filme",
  "video": false,
  "vote_average": 7.814,
  "vote_count": 4507
}

*/