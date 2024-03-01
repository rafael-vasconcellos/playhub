import { prodTypeValidate, production_details } from "@/global";
import { NextApiRequest, NextApiResponse } from "next";


type IQuery = {
    id?: string
    type?: string
    extend?: string
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) { 
    const { id, type: type_param, extend }: IQuery = request.query
    const type = prodTypeValidate(type_param)

    if (Number(id) && type) { 
        const append = extend? '&append_to_response=videos%2Cimages%2Crecommendations%2Csimilar%2Creviews%2Cseasons%2Ccredits' : ''
        const cache = extend? true : false
        const p = await production_details(Number(id), type, append, cache)
        response.send(p)
    } else {
        response.send({error: "Invalid Params!"})
    }
}