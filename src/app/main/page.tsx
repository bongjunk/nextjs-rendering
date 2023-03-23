'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const TextTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const PageType = styled.p`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: yellow;
    opacity: 0.8;
  }
`;

const Main = () => {
  const router = useRouter();
  return (
    <>
      <TextTitle>Types of Next.js 13 Rendering</TextTitle>
      <PageType onClick={() => router.push('/ssg')}>SSG</PageType>
      <PageType onClick={() => router.push('/ssr')}>SSR</PageType>
      <PageType onClick={() => router.push('/axios')}>AXIOS CSR</PageType>
    </>
  );
};

export default Main;
