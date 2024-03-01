import { IProductionDetails, discover } from '@/global'
import SliderCategory from './utils'
import { Suspense } from 'react'



type categoryProps = { 
    categoryName: string,
    categoryId?: number,
    type?: string,
    content?: IProductionDetails[]
}

const Category: React.FC<categoryProps> = async function( {categoryName, categoryId, type, content} ) { 
    async function getItems() { 
        if (type && categoryId && !content) { //await new Promise(res => setTimeout(res, 5000))
            const response = await discover(categoryId, type)
            return response

        } else if (content) { return content }
    }

    const data = await getItems()
    const skeleton = !data?.length? 'text-zinc-500 bg-zinc-500 animate-pulse' : ''
    const CategoryTitle = 
        <h1 className={`${skeleton} px-2 inline-block text-2xl font-bold`}>
            { content || !categoryId? 
                categoryName : (type==='tv'? 'Séries de ' : 'Filmes de ') + categoryName 
            }
        </h1>


    return ( 
        //<Suspense fallback={<SliderCategory data={null}>{CategoryTitle}</SliderCategory>}>
            <SliderCategory data={data} type={type}>{CategoryTitle}</SliderCategory>
        //</Suspense>
    )
}


export default Category