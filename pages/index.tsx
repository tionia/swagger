import dynamic from 'next/dynamic';
import Image from 'next/image';

import { ICard } from '@/components/card';
const Card = dynamic<ICard>(() => import('@/components/card'))
import { IGridContainer } from '@/components/grid-container';
const GridContainer = dynamic<IGridContainer>(() => import('@/components/grid-container'))
import { ILayout } from '@/layouts/layout.types';
const Layout = dynamic<ILayout>(() => import('@/layouts/layout'))

const portals = [
  {
    title: 'IDN Times',
    href: '/idntimes',
    url: 'https://www.idntimes.com',
    logo: 'idn-times.svg'
  },
  {
    title: 'IDN App',
    href: '/idn-app',
    url: 'https://www.idn.app',
    logo: 'idn-app.svg'
  },
  {
    title: 'Popbela',
    href: '/popbela',
    url: 'https://www.popbela.com',
    logo: 'popbela.svg'
  },
  {
    title: 'Popmama',
    href: '/popmama',
    url: 'https://www.popmama.com',
    logo: 'popmama.svg'
  },
  {
    title: 'Fortune Indonesia',
    href: '/fortune',
    url: 'https://www.fortuneidn.com',
    logo: 'fortune.svg'
  },
  {
    title: 'Yummy',
    href: '/yummy',
    url: 'https://www.yummy.co.id',
    logo: 'yummy.svg'
  },
  {
    title: 'Duniaku',
    href: '/duniaku',
    url: 'https://duniaku.idntimes.com',
    logo: 'duniaku.svg'
  },
  {
    title: 'IDN Media',
    href: '/idn-media',
    url: 'https://dashboard.idn.media',
    logo: 'idn-media.svg'
  },
]

export default function Home() {
  return (
    <Layout withHeader={false}>
      {/* title */}
      <div className='text-center mb-8 mt-20'>
        <div className='w-full h-16 relative mb-4'>
          <Image src='/assets/images/logo.svg' alt='IDN SwaggerHub' fill={true}></Image>
        </div>
        <h3 className='text-md text-gray-500'>Swagger and event documentations for all platforms across IDN Media</h3>
      </div>

      {/* cards */}
      <GridContainer>
        {portals.map((item, key) => <Card key={key}
            href={item.href}
            title={item.title}
            url={item.url}
            logo={item.logo}
          >
        </Card>)}
      </GridContainer>
    </Layout>
  )
}
