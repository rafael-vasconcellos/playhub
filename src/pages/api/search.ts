import { route_search, search, search_genre, prodTypeValidate } from "@/global";
import { NextApiRequest, NextApiResponse } from "next";


type IQuery = {
    q?: string
    type?: string
    page?: string
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
    const { q, type: type_param, page }: IQuery = request.query
    const type = prodTypeValidate(type_param)

    if (q && type && !Number(q)) { 
        //response.setHeader("Cache-Control", "public, stale-while-revalidate=3600")
        const n = Number(page)? Number(page) : 1
        response.send(  await search(q, type, n)  )

    } else if (type && Number(q)) { 
        const n = Number(page)? Number(page) : 1
        response.send(  await search_genre(Number(q), type, n)  )

    } else if (q && type && !Number(q) && page === '0') {
        response.send( await route_search(type, q) )

    } else {
        response.send({error: "Insert valid params!"})
    }
}