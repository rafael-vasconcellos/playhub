"use client"
import React, { useState, useEffect } from 'react'
import { IDetailsResumed, IDiscover } from '@/global'
import genres from '@/genres'
import { Show, path } from '../utils'



type IBannerProps = IDiscover & {
    pointer: number
}

export default function Component( {data}: {data?: IBannerProps} ) { 
    const [ index, setIndex ] = useState<number>(-1)

    useEffect(() => { 
        function func() { 
            if (data) { 
                const n = Math.round(Math.random()*data.results?.length)
                if (n !== index) { setIndex(n) }
            }
        }

        func()
        const interval = setInterval(func, 7000 )
        return () => { clearInterval(interval) }

    }, [data])


    return ( 
        <BannerCard item={data?.results[index]} />
    )
}




function BannerCard( {item}: {item?: IDetailsResumed} ) { 
    const [ small_screen, setScreen ] = useState(false)
    const elements_alignments = small_screen? "flex flex-col items-center" : ""

    function banner_url(item: IDetailsResumed) { 
        return small_screen? 
            "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/"+item?.poster_path : 
            "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"+item?.backdrop_path
    }

    useEffect(() => { 
        function update_screen() { 
            if (window.innerWidth < 900) { setScreen(true) }
            else if (window.innerWidth >= 900) { setScreen(false) } 
        }

        update_screen()
        window.onresize = update_screen
    }, [] )



//  ---------------------------------------------------------------------------------------------------------
    const skeleton = item? "" : 'text-zinc-500 bg-zinc-500'
    const animate = item? 'animate-display' : 'animate-pulse'
    const display = item? { 
        logo_url: 'logo.png',
        banner: banner_url(item),
        type: item?.media_type === 'movie'? 'Filme': 'Série',
        title: item?.title ?? item?.name,
        description: item?.overview
    } : { 
        logo_url: '',
        banner: '',
        type: 'Tipo',
        title: 'Título',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum consequatur impedit nostrum officia a sint id pariatur veniam, natus quibusdam porro error commodi qui nam itaque quod iusto quo.',

    }


    function resetAnim(el: HTMLElement | null) { 
        if (el) {
            el.style.animation = 'none'
            el.offsetWidth
            el.style.animation = ''
        }
    }

    const section = React.createRef<HTMLElement>()
    const container = React.createRef<HTMLDivElement>()
    useEffect(() => { 
        resetAnim(section.current)
        resetAnim(container.current)
    }, [item])


    return (
        <section ref={section} className={`banner w-screen h-screen mb-6 overflow-hidden bg-zinc-950 bg-no-repeat bg-center bg-cover ${animate}`} style={{backgroundImage: `url(${display.banner})`}} >
            <div className={`w-full h-full bg-zinc-950/[0.4] flex flex-col justify-end`}>
                <div ref={container} className={`px-10 py-20 animate-emerge ${elements_alignments}`}>
                        <div className='py-3 flex items-center gap-2'>
                            <div className='w-9 h-9 bg-contain' style={ {backgroundImage: `url(${display.logo_url})`} } />
                            <p className={`w-fit text-xl text-slate-300 ${skeleton}`}>{display.type}</p>
                        </div>

                        <div className='flex flex-col gap-10'>
                            <h1 className={`text-6xl font-bold w-fit text-center ${skeleton}`}>{display.title}</h1>
                            {!small_screen && <p className={`w-2/3 ${skeleton}`}>{display.description}</p>}
                        </div>

                        <Show when={small_screen}>
                            <div className='w-fit py-8'>                            
                                { item?.genre_ids?.map(id => genres[item?.media_type ?? '']?.list?.find(e => e.id === id)?.name)
                                  .map(name => <span className='px-2' key={"banner-tagname:"+name}>{name}</span>)   }
                            </div>
                        </Show>

                        { display.banner !== '' && <Buttons item={item} /> }
                </div>
            </div>
        </section>
    )

}


function Buttons( {item}: {item?: IDetailsResumed} ) { 

    return (
        <div className='flex items-center gap-2 py-4'>
                <a className='bg-zinc-50 text-zinc-950 p-3 flex items-center rounded-2xl'
                href={ path(item?.media_type, item?.id, item?.title ?? item?.name, item?.original_title ?? item?.original_name) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                    <b>Assistir</b>
                </a>
                <button className='text-zinc-50 px-3 flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    My List
                </button>
                <button className='text-zinc-50 p-3 flex flex-col items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    Info
                </button>
        </div>
    )
}


/*

https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg
https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/h8gHn0OzBoaefsYseUByqsmEDMY.jpg




*/