import { IEpisode } from "@/global";

export default function EpisodesList( {episodes}: {episodes?: IEpisode[]} ) { 

    return( 
        <div className="episodes">
            { episodes?.map( (episode) => 
                <div className="flex gap-2 my-7" key={episode.id}>
                    <img className="bg-zinc-500 min-w-[168px]" width="168" height="70" alt="episode banner" src={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${episode.still_path}`} />
                    <div>
                        <h1 className="font-bold">{episode.name}</h1>
                        <p className="my-2 w-4/5">{episode.overview}</p>
                    </div>
                </div>
            ) }
        </div>
    )
}