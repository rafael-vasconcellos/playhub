import Link from "next/link"
import { path } from "../utils"

type ItemProps = { 
    type: string, 
    id: number, 
    pic: string, 
    title?: string,
    original_title?: string, 
}

const H_Item: React.FC<ItemProps> = function( { type, id, pic, title, original_title } ) {
    const skeleton = !pic? 'bg-zinc-500' : ''

    return (
        <Link href={ path(type, id, title, original_title) }>
            <div className="flex gap-2 my-5 items-center" >
                <div className={`${skeleton} bg-contain bg-no-repeat`} style={ {width: '75px', height: '113px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${pic})`} } />
                <p style={ {maxWidth: '160px'} }>{title ?? 'Título'}</p>
            </div>
        </Link>
    )
}

export default H_Item