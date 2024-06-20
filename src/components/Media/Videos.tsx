import { IVideo } from "./Images"


const Videos: React.FC<{indice: IVideo}> = function( {indice} ) { 
    const url = `https://www.youtube.com/watch?v=${indice.key}`

    return (
        <a href={url} target='_blank' key={indice.key}>
            <div className='bg-zinc-500 bg-no-repeat bg-contain bg-center' style={ {width: '300px', height: '169px', backgroundImage: `url(https://i.ytimg.com/vi/${indice.key}/maxresdefault.jpg)`} } />
            <p className="py-3">{indice.name}</p>
        </a>
    )
}

export default Videos