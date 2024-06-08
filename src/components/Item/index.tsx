"use client"
import { useState } from 'react'
import Details from '../Details'

type ItemProps = {
    title?: string,
    pic?: string,
    id?: number | undefined,
    type?: string,
}

const Item: React.FC<ItemProps> = function( { title, pic, id, type } ) {
    const [ hover, setHover ] = useState(false)

    let skeleton, animate_bg = ''
    if (!title) {
        title = 'Título'
        skeleton = 'text-zinc-500 bg-zinc-500 animate-pulse'
    }

    if (!pic) {
        pic = ''
        animate_bg = 'animate-pulse'
    }


    // 104, 156
    return (
        <div className={`i${id} relative px-6 py-2 cursor-pointer flex flex-col gap-3 justify-center`}
         onMouseOver={  () => {
            if (!hover) {setHover(() => true)}

        } } onMouseLeave={ () => { 
            let elements = Array.from(document.querySelectorAll(`.i${id}`))
            for (let indice of elements) {
                if (indice.children[2]?.className.includes('absolute') && hover) {
                    setHover(() => false)
                }
            }
        } } >

                <div className={`bg-zinc-500 bg-center bg-contain ${animate_bg}`} style={{width: '150px', height: '225px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${pic})`}} />
                <h2 className={skeleton} style={ {width: '150px'} }> {title} </h2>
                {(hover && id) && <Details type={type} id={id}/>}

        </div>
    )
}

export default Item