import { NextApiRequest, NextApiResponse } from 'next'
import { discover, prodTypeValidate } from '@/global'


type IQuery = {
    genreid?: string
    type?: string
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
    const { genreid, type: type_param }: IQuery = request.query
    const type = prodTypeValidate(type_param)

    if (genreid && type && Number(genreid)) { 
        const d = await discover(Number(genreid), type)
        //response.setHeader("Cache-Control", "public, stale-while-revalidate=3600")
        response.send(d)
    } else {
        response.send( {error: 'Invalid params!'} ) 
    }

}