import Link from 'next/link';
import { useRouter } from 'next/router';

/* import breadcrumb links */
import pageBreadcrumbs from '@/public/docs/breadcrumbs.json';

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
export interface IBreadcrumbs {}

/* breadcrumb html */
function Breadcrumbs({}: IBreadcrumbs) {
  const router = useRouter()
  const currentPage: Record<string, any > | undefined = pageBreadcrumbs.find(item => item.current_url == router.pathname)
  const links = currentPage?.links

  return (
    <div className='px-10 mt-8 flex flex-wrap items-center text-sm'>
      <Link href={'/'} className='text-tarnished-silver hover:text-silver-charm'>
        <FontAwesomeIcon icon={faHome} />
      </Link>

      {links.map((link: LinkProps, index: number) => 
        <div className='flex flex-wrap items-center' key={index}>
          <span className='mx-3'>
            <FontAwesomeIcon
                icon={faAngleRight}
                size='xs'
                className='text-silver-charm'
            />
          </span>
          <Link href={link.url} className={link.is_active === false ? 'text-tarnished-silver hover:text-silver-charm' : 'font-bold cursor-default'}>{link.title}</Link>
        </div>
      )}
    </div>
  );
}

export default Breadcrumbs;