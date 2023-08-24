import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Key, useCallback, useMemo, useState } from 'react';

import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Chip,
  Input,
  ChipProps,
} from "@nextui-org/react";

/* fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { ILayout } from '@/layouts/layout.types';
import { IBreadcrumbs } from '@/components/breadcrumbs';
import { useRouter } from 'next/router';
const Layout = dynamic<ILayout>(() => import('@/layouts/layout'))
const Breadcrumbs = dynamic<IBreadcrumbs>(() => import('@/components/breadcrumbs'))

const links = [
  {
    title: 'Fortune',
    url: '/fortune',
    is_active: false,
  },
  {
    title: 'Post API',
    url: '/fortune/post-api',
    is_active: true,
  },
]

const data = [
  {
    key: "1",
    method: "GET",
    endpoint: "Get list pay-in histories",
    route: "/pay-in/histories",
    url: "/fortune/post-api/docs",
    be_version: "v1",
    swagger_version: "v1",
    last_updated: "August 1st, 2023",
  },
  {
    key: "2",
    method: "POST",
    endpoint: "Create pay-in history",
    route: "/pay-in/histories",
    url: "/fortune/post-api/docs",
    be_version: "v1",
    swagger_version: "v1.1",
    last_updated: "August 1st, 2023",
  },
  {
    key: "3",
    method: "GET",
    endpoint: "Get pay-in history detail",
    route: "/pay-in/histories/{id}",
    url: "/fortune/post-api/docs",
    be_version: "v1",
    swagger_version: "v2",
    last_updated: "August 1st, 2023",
  },
  {
    key: "4",
    method: "PUT",
    endpoint: "Update pay in history",
    route: "/pay-in/histories/{id}",
    url: "/fortune/post-api/docs",
    be_version: "v1",
    swagger_version: "v1",
    last_updated: "August 1st, 2023",
  },
  {
    key: "5",
    method: "DELETE",
    endpoint: "Delete pay-in history",
    route: "/pay-in/histories",
    url: "/fortune/post-api/docs",
    be_version: "v1",
    swagger_version: "v2",
    last_updated: "August 1st, 2023",
  },
];

const columns = [
  {
    key: "method",
    label: "Method",
  },
  {
    key: "endpoint",
    label: "Endpoint",
  },
  {
    key: "route",
    label: "Route",
  },
  {
    key: "be_version",
    label: "Backend Version",
  },
  {
    key: "swagger_version",
    label: "Latest Swagger Version",
  },
  {
    key: "last_updated",
    label: "Last Updated",
  },
];

enum MethodColor {
  POST = 'bg-swagger-green',
  GET = 'bg-swagger-blue',
  PUT = 'bg-swagger-yellow',
  DELETE = 'bg-swagger-red',
}

export default function FortunePostApi() {
  const router = useRouter()
  const [searchNameValue, setSearchNameValue] = useState<string>("");

  // const hasSearchNameFilter = Boolean(searchNameValue);

  const onSearchNameChange = useCallback((value:string) => {
    console.log(value)
    setSearchNameValue(value)
  }, [searchNameValue])

  type Data = typeof data[0]

  const classNames = useMemo(
    () => ({
      th: ["bg-transparent", "text-tarnished-silver", "border-b", "border-divider"],
      td: ['text-dark-willow'],
    }),
    [],
  )

  const searchBar = useMemo(
    () => {
      return (
        <div>
          <div className='text-lg font-black mb-5'>
            Swagger Endpoint Changelog
          </div>
          <div className='flex flex-wrap sm:flex-nowrap gap-3'>
            <Input
              isClearable
              placeholder='Search by endpoint name'
              classNames={{
                base: "w-full sm:w-1/2",
                inputWrapper: "border-1",
                input: 'border-none focus:ring-0 placeholder:text-silver-charm pl-1'
              }}
              size="md"
              variant="bordered"
              startContent={<FontAwesomeIcon icon={faSearch} size='xs' className='text-tarnished-silver' />}
              value={searchNameValue}
              onValueChange={onSearchNameChange}
            >
            </Input>
            <Input
              isClearable
              placeholder='Search by route'
              classNames={{
                base: "w-full sm:w-1/2",
                inputWrapper: "border-1",
                input: 'border-none focus:ring-0 placeholder:text-silver-charm pl-1'
              }}
              size="md"
              variant="bordered"
              startContent={<FontAwesomeIcon icon={faSearch} size='xs' className='text-tarnished-silver' />}
            >
            </Input>
          </div>
        </div>
      )
    },
    [onSearchNameChange]
  )

  const renderCell = useCallback((row: Data, columnName: Key) => {
      const cellValue = row[columnName as keyof Data]
      
      switch (columnName) {
        case 'method':
          return (
            <div className={`py-2 rounded-lg text-center font-black text-flash-white text-xs w-20 bg-swagger-blue`}>
              {cellValue}
            </div>
          )
        case 'be_version':
        case 'swagger_version':
          return (
            <pre className='px-2 rounded-md text-tarnished-silver font-mono font-bold bg-calla-lilly w-fit'>{cellValue}</pre>
          )
        default:
          return cellValue
      }
    }, [])


  return (
    <Layout>
      <Breadcrumbs links={links}></Breadcrumbs>
      
      <div className='px-10 py-8'>
        <Table aria-label='Changelog'
          topContent={searchBar}
          topContentPlacement='outside'
          classNames={classNames}
        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={data}
            emptyContent={'No specs found'}>
            {
              // item --> single object
              (item) => <TableRow key={item.key} className='hover:bg-flash-white'>
                {
                  // columnName --> loop through each item.column
                  // router.push() behaves like href on link
                  (columnName) => <TableCell onClick={() => router.push(item.url)} className='cursor-pointer'>
                    {renderCell(item, columnName)}
                  </TableCell>
                }
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}
