import { useRouter } from 'next/router';
import { Key, useCallback, useMemo, useState } from 'react';

/* fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Input,
  } from "@nextui-org/react";


/* table inteface */
export interface IChangelogTable {
    changelog: Record<string, string>[]
}

// object data type --> Record<type of key, type of value>
const methodColor: Record<string, string> = {
    POST: 'bg-swagger-green',
    GET: 'bg-swagger-blue',
    PUT: 'bg-swagger-yellow',
    DELETE: 'bg-swagger-red',
  }

/* table columns */
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
  
/* table html */
function ChangelogTable({changelog}: IChangelogTable) {
  const router = useRouter()
  const [searchNameValue, setSearchNameValue] = useState<string>("")
  const [searchRouteValue, setSearchRouteValue] = useState<string>("")

  const hasSearchNameFilter = Boolean(searchNameValue)
  const hasSearchRouteFilter = Boolean(searchRouteValue)

  // functions that triggered when search bar filled
  const onSearchNameChange = useCallback((value:string) => {
    setSearchNameValue(value)
  }, [searchNameValue])
  const onSearchRouteChange = useCallback((value:string) => {
    console.log(value)
    setSearchRouteValue(value)
  }, [searchRouteValue])

  // apply the filter to the changelog data
  const filteredData = useMemo(() => {
    let filtered = [...changelog] // ... --> get the value of the changelog variable

    if (hasSearchNameFilter) {
      filtered = filtered.filter((item) => item.endpoint.toLowerCase().includes(searchNameValue.toLowerCase()))
    }
    if (hasSearchRouteFilter) {
      filtered = filtered.filter((item) => item.route.toLowerCase().includes(searchRouteValue.toLowerCase()))
    }

    return filtered
  }, [changelog, searchNameValue, searchRouteValue]) // changed data

  // appended content on top of table
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
              onClear={() => setSearchNameValue('')}
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
              value={searchRouteValue}
              onClear={() => setSearchRouteValue('')}
              onValueChange={onSearchRouteChange}
            >
            </Input>
          </div>
        </div>
      )
    },
    [onSearchNameChange, onSearchRouteChange, hasSearchRouteFilter, hasSearchNameFilter]
  )

  // type behaves like interface
  type Data = typeof changelog[0] // type data with the structure of changelog item

  // render the cell appearance according to the column name
  const renderCell = useCallback((row: Data, columnName: Key) => { 
    // columnName values --> method, endpoint, route, url, be_version, swagger_version, last_updated
    // row --> item of changelog (type --> Data)
    const cellValue = row[columnName as keyof Data] // cellvalue = row.columnName

    switch (columnName) {
      case 'method':
        return (
          <div className={`py-2 rounded-lg text-center font-black text-flash-white text-xs ${methodColor[cellValue]}`}>
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

  }, []) // no need to add the changed var here since this is preloaded (no need to be triggered by any changes)

  // classes to be applied to the table
  const classNames = useMemo(
    () => ({
      th: ["bg-transparent", "text-tarnished-silver", "border-b", "border-divider"],
      td: ['text-dark-willow'],
    }),
    [],
  )

  return (
    <Table aria-label='Changelog'
        topContent={searchBar}
        topContentPlacement='outside'
        classNames={classNames}
    >
        <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={filteredData}
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
  );
}

export default ChangelogTable;