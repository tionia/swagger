import Image from 'next/image';
import Link from 'next/link';

/* fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

/* breadcrumb links props */
interface LinkProps {
  title: string
  url: string
  is_active: boolean
}

/* breadcrumb inteface */
export interface IBreadcrumbs {
  links: Array<LinkProps>
}

/* breadcrumb html */
function Breadcrumbs({links}: IBreadcrumbs) {
  return (
    <div className='px-10 mt-8 flex flex-wrap items-center text-sm'>
      <Link href={'/'} className='text-tarnished-silver hover:text-silver-charm'>
        <FontAwesomeIcon icon={faHome} />
      </Link>

      {links.map((link, index) => 
        <div className='flex flex-wrap items-center' key={index}>
          <span className='mx-3'>
            <FontAwesomeIcon
                icon={faAngleRight}
                size='xs'
                className='text-silver-charm'
            />
          </span>
          <Link href={link.url} className={link.is_active === false ? 'text-tarnished-silver hover:text-silver-charm' : 'font-bold cursor-not-allowed'}>{link.title}</Link>
        </div>
      )}
    </div>
  );
}

export default Breadcrumbs;