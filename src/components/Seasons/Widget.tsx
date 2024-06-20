"use client"
import { useState } from "react"
import EpisodesList from "./EpisodesList"
import { ISeason } from "@/global"



export default function SeasonWidget( {seasons, seasonsWithEpisodes}: {seasons: ISeason[], seasonsWithEpisodes: ISeason[]} ) { 
    const [ current_display, setCurrentDisplay ] = useState(-1)
    // display(`temp`+e.season_number, 'episodes', 'hidden')
    // <div className={`temp${e.season_number} hidden`} key={`temp${e.season_number}`}>

    return (
        <section className="px-4 mb-14">
            <b className="text-xl">Temporadas:</b>
            <div className="m-4 flex gap-1 flex-wrap">
                { seasons.map( (season, i) => 
                    <span className="rounded-full cursor-pointer py-2 px-4 font-bold" style={ {border: '1px solid white'} } 
                    key={`tempn-${season.season_number}`} onClick={ () => { setCurrentDisplay(i) } }>
                        {season.season_number}
                    </span>)
                }
            </div>

            <EpisodesList episodes={seasonsWithEpisodes[current_display-1]?.episodes} />
        </section>
    )
}

