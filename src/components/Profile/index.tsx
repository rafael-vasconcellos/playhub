"use client"
import { StaticImageData } from 'next/image'
import { ReactNode, useState } from 'react'



type profileProps = {
    href: StaticImageData
    children?: ReactNode
}

const Profile: React.FC<profileProps> = function( {href, children} ) { 
    const [menuVisible, setmenuVisible] = useState('hidden')
    const menuItems = 'px-3 py-1 hover:bg-zinc-500 cursor-pointer'

      return (
        <section>
          <div className='inline-flex items-center gap-3 absolute top-2 right-2 z-10'>

              { children }
              <button className='text-zinc-500 px-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                  className="w-6 h-6" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                  </svg>
              </button>

              {/* imagem */}
              <div className={`h-12 w-12 rounded-full bg-zinc-600 inline-block bg-contain`} style={{backgroundImage: `url('${href?.src}')`}}></div>
              <label className='inline-block cursor-pointer' htmlFor="select">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6 text-zinc-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
              </label>

              <input type="checkbox" id='select' 
              onChange={ (e) => {
                const value = e.target.checked? 'inline-block' : 'hidden'
                setmenuVisible(value)
              }
              } className='hidden'/>

              <ul className={`py-3 w-44 h-56 bg-zinc-600 rounded-lg absolute top-14 right-0 ${menuVisible}`}>
                  <li className={menuItems}>Conta</li>
                  <li className={menuItems}>Minha lista</li>
                  <li className={menuItems}>Configurações</li>
                  <li className={menuItems}>Mudar de perfil</li>
                  <li className={menuItems}>Help</li>
                  <li className={menuItems}>Sair</li>
              </ul>

          </div>
        </section>
      )
}

export default Profile
