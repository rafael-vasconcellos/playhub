import { trending } from '@/global'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function GET(request: NextApiRequest, response: NextApiResponse) { 
    //response.setHeader("Cache-Control", "public, stale-while-revalidate=3600")
    response.send( await trending() )
}

