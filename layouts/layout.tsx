// layout html
import { Providers } from "@/pages/providers";
import { ILayout } from "./layout.types";
import { Lato } from 'next/font/google'
import Image from "next/image";
import Link from 'next/link';

/* 
*  define font --> const fontVarName = FontClass({properties})
*  load font --> ${fontVarName.className} inside className attribute
*/
const lato = Lato({ 
  weight: ['100', '300', '400', '700', '900'], 
  subsets: ['latin'],
})


/* children & dropdown are parameters on layout interface */
function Layout({children, dropdown, withHeader, breadcrumbs}: ILayout) { 

  return (
    <Providers>
      <main className={`text-dark-willow ${lato.className}`}>
          {withHeader === true &&
            <div className="flex justify-between items-center sticky top px-10 py-6 bg-dark-willow">
                <div className='text-left'>
                    <Link href='/' className='h-full'>
                      <Image src='/assets/images/logo-white.svg' alt='IDN SwaggerHub' width={200} height={40} priority={false}></Image>
                    </Link>
                </div>
                {/* include swagger spec dropdown --> defined in page */}
                <div className='w-4/5'>
                  {dropdown} 
                </div>
            </div>
          }
        
        {breadcrumbs}

        {/* page content */}
        {children}
      </main>
    </Providers>
  );
}

export default Layout;

Layout.defaultProps = {
  withHeader: true
}