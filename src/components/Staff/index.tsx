import { IProductionCompanies } from "../../global"
import Person, { ICastPerson, ICrewPerson } from "../Person"


type StaffProps = {
    staff?: {
        cast: ICastPerson[], 
        crew: ICrewPerson[]
    },

    production_companies?: IProductionCompanies[]
}

const Staff: React.FC<StaffProps> = function( {staff, production_companies} ) { 
    const animate = staff && production_companies? '' : "animate-pulse"
    const background = staff && production_companies? '' : "text-zinc-500 bg-zinc-500"
    if (!staff) { staff = {cast: Array(6).fill(null)} as any }
    
    const direction = staff?.crew?.filter(e => e.known_for_department === 'Directing')
    const writers = staff?.crew?.filter(e => e.known_for_department === 'Writing')

    return (
        <section className="px-5 my-3">
            <div className="w-full flex flex-wrap">{ staff?.cast?.slice(0, 8)?.map(e => <Person person={e} key={Math.random()} />) }</div>
            <div className="my-6 flex flex-col gap-3">
                <div><b className={animate+` `+background}>Direção:</b> {direction?.map(e => e.name+' - ')}</div>
                <div><b className={animate+` `+background}>Roteiro:</b> {writers?.map(e => e.name+' - ')}</div>
                <div><b className={animate+` `+background}>Produção:</b> {production_companies?.map(e => e.name+' - ')}</div>
            </div>
        </section>
    )
}

export default Staff