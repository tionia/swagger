import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { ILayout } from '@/layouts/layout.types';
import { IDropdown } from '@/components/dropdown';
import { IBreadcrumbs } from '@/components/breadcrumbs';

import { SwaggerUIProps } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

import versionList from '@/public/docs/fortune/gateway/versions.json';

const SwaggerUI = dynamic<SwaggerUIProps>(import('swagger-ui-react'), { ssr: false });
const Layout = dynamic<ILayout>(() => import('@/layouts/layout'))
const Dropdown = dynamic<IDropdown>(() => import('@/components/dropdown'))
const Breadcrumbs = dynamic<IBreadcrumbs>(() => import('@/components/breadcrumbs'))

function ApiDoc() {
  const router = useRouter()
  // version query param
  const { version } = router.query
  // path params
  const path = router.pathname

  const specPath = `/docs${path.replace('/docs', '')}`

  const [spec, setSpec] = useState(`${specPath}/v1.yml`);
  const [value, setValue] = useState<string | string[] | undefined>('v1') // value (variable), setValue (function for set the value of value)
  console.log(spec)

  useEffect(() => { // catch the event when something is changed --> run the code inside this function
    let selectValue = version
    if (version === undefined || version === null || version === '') {
      selectValue = 'v1'
    }

    setSpec(`${specPath}/${selectValue}.yml`) // set the spec file 
    setValue(selectValue) // set the value of selected dropdown
  }, [version]) // variable where the change event occurs that triggers the function to run --> version = change on version query params

  return (
    <Layout dropdown={<Dropdown selected={value} versions={versionList} />}>
      <Breadcrumbs />
      <SwaggerUI url={spec} deepLinking/>
    </Layout>
  );
}

export default ApiDoc;