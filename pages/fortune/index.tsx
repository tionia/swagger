import dynamic from 'next/dynamic';
import { ILayout } from '@/layouts/layout.types';
import { ICard } from '@/components/card';
import { IGridContainer } from '@/components/grid-container';
import { IBreadcrumbs } from '@/components/breadcrumbs';
const Layout = dynamic<ILayout>(() => import('@/layouts/layout'))
const Card = dynamic<ICard>(() => import('@/components/card'))
const GridContainer = dynamic<IGridContainer>(() => import('@/components/grid-container'))
const Breadcrumbs = dynamic<IBreadcrumbs>(() => import('@/components/breadcrumbs'))

const links = [
  {
    title: 'Fortune',
    url: '/fortune',
    is_active: true,
  },
]

export default function FortuneHome() {
  return (
    <Layout>
      <Breadcrumbs links={links}></Breadcrumbs>
      <GridContainer>
        <Card href='/fortune/api' title='Gateway' url='https://api.fortuneidn.com'/>
        <Card href='/fortune/post-api' title='Post API' url='https://post-api.fortuneidn.com'/>
      </GridContainer>
    </Layout>
  )
}
