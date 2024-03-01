import './style.css'
import H_Item from "../H_Item"
import { IProductionDetails } from '../../global'



type AsideContent = Partial<IProductionDetails> & { 
    id: number,
    backdrop_path: string,
    poster_path: string,
    media_type: string,
}

const Aside: React.FC<{content: AsideContent[], name: string}> = function( {content, name} ) {

    return (
        <aside className="absolute top-0 right-4">
            <h1 className="font-bold text-xl">{name}{name? ':' : ''}</h1>
            <div>
                {content.map(e => 
                    <H_Item type={e.media_type} title={ e.title ?? e.name } 
                    pic={ e.backdrop_path ?? e.poster_path } 
                    original_title={ e.original_title ?? e.original_name }
                    id={e.id} key={`aside ${e.id}`} />
                ) }
            </div>
        </aside>
    )
}

export default Aside