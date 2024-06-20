"use client"
import { YTAPI } from "../utils"
import { IVideo } from "../Media/utils"
import './style.css'



type EmbeddedVideoProps = {
    videos: IVideo[]
}

const ytVid = new YTAPI()

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = function( {videos} ) { 
    const video = videos?.find(e => e.type === 'Trailer')

    return (
        <section>
            <div id="player" data-video-key={video?.key}></div>
            <div className="absolute top-0 right-0 px-8 py-4 bg-black">
                <button className="py-2 px-4 font-bold text-3xl bg-black rounded-full"
                style={ {border: '1px solid white'} }
                onClick={ () => ytVid.close() }>X</button>
            </div>
        </section>
    )
}


const ButtonVideo = function () { 
    let trailer_hover: boolean

    return (
        <button className="cursor-pointer p-2 w-fit bg-zinc-50 text-zinc-950 font-bold rounded-xl" 
        onClick={ () => {  
            if (!ytVid.player && ytVid.status) {ytVid.onYouTubeIframeAPIReady()}
            else if (ytVid.player) {ytVid.replay()}
        } }
        onMouseLeave={ () => { if (trailer_hover) {trailer_hover = false} }}
        onMouseEnter={ () => { 
            if (!trailer_hover) { 
                trailer_hover = true
                setTimeout( () => { 
                    if (trailer_hover) { ytVid.initializeYouTubeAPI() }
                }, 200 )
            }
        } }>
            Assistir trailer
        </button>
    )
}


export { ButtonVideo, EmbeddedVideo }