import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/* card inteface */
export interface ICard {
    children?: React.ReactNode;
    href: string;
    title: string;
    url: string;
    logo?: string;
}

/* card html */
function Card({href, title, logo, url}: ICard) {
  return (
  <div className='px-8 py-6 text-left rounded-lg border-calla-lilly border-2'>
    {logo != undefined &&
      <div className='relative text-left mb-5'>
        <Image src={`/assets/images/${logo}`} alt={title} height={30} width={120}></Image>
      </div>
    }
    <Link href={href} className='block text-xl sm:text-2xl font-black break-words'>{title}</Link>
    <p className='text-tarnished-silver block text-xs sm:text-sm mt-1 sm:mt-2 break-words'>{url}</p>
  </div>);
}

export default Card;