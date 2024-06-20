"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Details from '../Details'
import { path } from '../utils'
import './style.css'


type ItemProps = {
    title?: string,
    pic?: string,
    id?: number | undefined,
    type?: string,
    original?: string
}

const Item: React.FC<ItemProps> = function( { title, pic, id, type, original } ) {
    const [ hover, setHover ] = useState(false)
    const navigate = useRouter()

    let skeleton, animate_bg = ''
    if (!title) {
        title = 'Título'
        skeleton = 'text-zinc-500 bg-zinc-500 animate-pulse'
    }

    if (!pic) {
        pic = ''
        animate_bg = 'animate-pulse'
    }


    return ( 
        <div className={`i${id} relative px-6 py-2 cursor-pointer flex flex-col gap-3 justify-center`}
         onClick={ () => navigate.push(path(type, id, title, original)) }
         onMouseOver={  () => { 
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) { return }
            if (!hover) { setHover(true) }

        } } onMouseLeave={ () => { 
            let elements = Array.from(document.querySelectorAll(`.i${id}`))
            for (let indice of elements) {
                if (indice.children[2]?.className.includes('absolute') && hover) { setHover(false) }
            }
        } } >

                <div className={`bg-zinc-500 bg-center bg-contain ${animate_bg}`} style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${pic})` }} />
                <h2 className={skeleton}> {title} </h2>
                {(hover && id) && <Details type={type} id={id}/>}

        </div>
    )
}

export default Item