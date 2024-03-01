import { get_season } from "@/global";
import { NextApiRequest, NextApiResponse } from "next";


type IQuery = {
    id?: string
    season?: string
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
    const { id, season }: IQuery = request.query

    if (Number(id) && Number(season)) {
        const s = await get_season(Number(id), Number(season))
        response.send(s)
    } else {
        response.send({error: "Invalid Params!"})
    }
}