import Production from "@/app/Production";
import { ProductionCard } from "@/app/Production/utils";
import Category from "@/components/Category";
import Navbar from "@/components/Navbar";
import Staff from "@/components/Staff";
import { IPageProps } from "@/global";
import { Suspense } from "react";


export default function Page( { params, searchParams }: IPageProps ) { 
    return ( 
        <Suspense fallback={
            <>
                <Navbar />
                <ProductionCard data={null} />
                <div className="relative">
                    <Staff />
                    <Category categoryName="Placeholder" />
                    <Category categoryName="Placeholder" />
                </div>
            </>
        }>
            <Production type='tv' params={params} />
        </Suspense>
    )
}

