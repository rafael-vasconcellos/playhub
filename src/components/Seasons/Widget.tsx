"use client"
import { display } from "../utils"



export const EpisodesSchema = { episodes: [], season_number: 0, }

export default function SeasonWidget( {seasons, episodes}: {seasons: any[], episodes: typeof EpisodesSchema[]} ) { 

    return (
        <section className="px-4 mb-14">
            <b className="text-xl">Temporadas:</b>
            <div className="flex gap-1 m-4">
                { seasons.map(e => 
                    <span className="rounded-full cursor-pointer py-2 px-4 font-bold" style={ {border: '1px solid white'} } 
                    onClick={  () => {display(`temp`+e.season_number, 'episodes', 'hidden')}  } key={`tempn${e.season_number}`}
                    > {e.season_number} </span>)
                }
            </div>

            <div className="episodes">
                { episodes?.map( (e: typeof EpisodesSchema) => 

                    <div className={`temp${e.season_number} hidden`} key={`temp${e.season_number}`}>
                        { e.episodes.map( (indice:any) => 
                            <div className="flex gap-2 my-7" key={indice.id}>
                                <img className="bg-zinc-500" src={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${indice.still_path}`} width="168" height="70" alt=" " />
                                <div>
                                    <h1 className="font-bold">{indice.name}</h1>
                                    <p className="my-2 w-4/5">{indice.overview}</p>
                                </div>
                            </div>
                        ) }
                    </div>

                ) }
            </div>
        </section>
    )
}

