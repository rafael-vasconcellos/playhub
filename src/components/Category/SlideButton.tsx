export default function SlideButton( {name, onClick, className}: { name: "next" | "prev" | "previous" } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> ) { 
    const angle = name==="next"? "" : "rotate-180"

    return (
        <button className={`h-[300px] min-w-14 my-6 bg-primary/40 text-white cursor-pointer flex justify-center items-center z-10 ${className}`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
             className={`size-8 ${angle}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    )
}