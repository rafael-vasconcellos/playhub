import { get_images } from "@/global";
import { NextApiRequest, NextApiResponse } from "next";


type IQuery = {
    id?: string
}

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
    const { id }: IQuery = request.query

    if (Number(id)) {
        const i = await get_images(Number(id))
        response.send(i)
    } else {
        response.send({error: "Invalid Params!"})
    }
}