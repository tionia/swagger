import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react';


export interface IDropdown {
    selected?: string | string[] | undefined;
    versions: string[]
}

export default function Dropdown({versions, selected}: IDropdown) {
    const router = useRouter() // get the url

    const dropdownClick = useCallback((e:any) => { // function to change query params on dropdown change
        router.push({
          query: {
            version: e.target.value
          }
        })
      }, []);

  return (
    <div className='flex justify-end items-center h-full'>
      <p className='font-bold mr-4 text-sm text-white'>Select a definition</p>
      <select 
        value={selected} 
        name="version" 
        id="version" 
        onChange={dropdownClick}
        className='dropdown rounded-md bg-tarnished-silver bg-opacity-60 border-0 text-sm focus:ring-0 focus:outline-gray-400 text-flash-white py-1'>
        {versions.map(version => <option key={version} value={version} className='bg-white text-dark-willow'>
            {version}
          </option>
        )}
      </select>
    </div>
    );
}