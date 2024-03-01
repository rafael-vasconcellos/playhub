import star from '../../assets/star.png'
import fire from '../../assets/fire.png'

const Score: React.FC<{data: any}> = function( {data} ) { 

    return (
        <div className="absolute top-6 right-8 flex items-center gap-4">
            <div className='flex items-center gap-2'>
                <div className="w-6 h-6 bg-contain" style={ {backgroundImage: `url(${star.src})`} } />
                <p className="flex flex-col items-center"> 
                    <span className="font-bold text-xl">{data?.vote_average?.toFixed(2)}/10</span>
                    <span className="text-zinc-300 text-sm"> {data?.vote_count>1000? data?.vote_count?.toLocaleString()+' mil': data?.vote_count} </span>
                </p>
            </div>
            { data?.popularity < 500 && 
                <span className='flex gap-1'>
                    <div className="w-6 h-6 bg-contain" style={ {backgroundImage: `url(${fire.src})`} } />
                    <p className='font-bold'>{data?.popularity < 500? data?.popularity.toFixed() : ''}</p>
                </span>
            }
        </div>
    )
}

export default Score