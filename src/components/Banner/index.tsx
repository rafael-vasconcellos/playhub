import { trending } from "@/global"
import BannerCard from "./utils"

export default async function Banner() { 
    const data = await trending()

    return (
        <BannerCard data={data} />
    )
}