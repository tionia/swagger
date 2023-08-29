import dynamic from 'next/dynamic';

import { ILayout } from '@/layouts/layout.types';
import { IBreadcrumbs } from '@/components/breadcrumbs';
import { IChangelogTable } from '@/components/changelog-table';
const Layout = dynamic<ILayout>(() => import('@/layouts/layout'))
const Breadcrumbs = dynamic<IBreadcrumbs>(() => import('@/components/breadcrumbs'))
const ChangelogTable = dynamic<IChangelogTable>(() => import('@/components/changelog-table'))

import changelog from '@/public/docs/fortune/gateway/changelog.json';

export default function App() {

  return (
    <Layout>
      <Breadcrumbs />
      
      <div className='px-10 py-8'>
        <ChangelogTable changelog={changelog}></ChangelogTable>
      </div>
    </Layout>
  )
}