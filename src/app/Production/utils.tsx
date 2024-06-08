import { IVideo } from "@/components/Media/utils"
import EmbeddedVideo, { ButtonVideo } from "../../components/EmbeddedVideo"
import Score from "../../components/Score"
import { Show } from "../../components/utils"
import { IProductionDetails } from "../../global"



function findVideoKey(videos: IVideo[]): IVideo | undefined {
    return videos?.find(e => e.type === 'Trailer')
}

const ProductionCard: React.FC<{data: IProductionDetails | any}> = function( {data} ) { 
    const animate = data? '' : "animate-pulse"
    const background = data? '' : "text-zinc-500 bg-zinc-500"

    return (
        <div className="min-w-screen w-fit h-fit mb-6 text-white bg-center bg-no-repeat bg-cover" style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.backdrop_path})`} }>
            <div className="bg-zinc-950/[0.6] w-full h-full relative">
                    <div className="px-[2vw] py-7 relative flex gap-6 items-start">

                            {/* poster */}
                            <div className={`poster bg-zinc-500 bg-contain bg-center ${animate} ${background}`} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data?.poster_path})` }} />

                            {/* details */}
                            <div className="w-3/5 flex flex-col gap-3">
                                <h1 className="w-64 font-bold text-2xl py-3">{data?.title ?? data?.name}</h1>
                                <h2><b>{data?.original_title? `Título original:` : ''}</b> {data?.original_title}</h2>

                                <div className="flex items-center gap-1 mb-3"> {/* classificação e etc. */}
                                    <Show when={data} fallback={<span className={`p-2 ${animate} ${background}`} />}>
                                        <span className={`p-2 ${data?.adult? "bg-zinc-950":"bg-sky-500"}`}>
                                            {data?.adult? '18':'13'}
                                        </span>
                                    </Show>
                                    <p>{data?.release_date?.slice(0, 4)}</p>
                                    <p className="text-zinc-300 italic">
                                    {!Number.isNaN(Math.floor(data?.runtime / 60))? ' - '+Math.floor(data?.runtime/60)+'h' : ''} 
                                    {!Number.isNaN(data?.runtime % 60)? data?.runtime%60+'min' : ''}
                                    </p>
                                </div>

                                { findVideoKey(data?.videos?.results) && <ButtonVideo />}

                                <div>
                                    <h1 className={`font-bold text-xl my-2 ${background} ${animate}`}>Sinopse</h1>
                                    <p>{data?.overview}</p>
                                </div>
                                <p className="text-zinc-300 italic">{data?.tagline}</p>
                                <div className="flex flex-col gap-2 my-3">
                                    <p><b className={animate+' '+background}>Generos:</b> {data?.genres?.map( (e:{name: string, id: number}) => <span className="p-1 m-1" style={ {border: '1px solid white'} } key={`gen-${e.name}`}>{e.name}</span>  )}</p>
                                    <p className="py-2"><b className={animate+' '+background}>Status:</b> {data?.status}</p>
                                </div>
                            </div>

                            {/* score */}
                            { data && <Score data={data} /> }
                    </div>


                    { data?.videos?.results?.length > 0 && (
                        <EmbeddedVideo videos={data?.videos.results} />
                    ) }

            </div>
        </div>
    )
}


export { ProductionCard }