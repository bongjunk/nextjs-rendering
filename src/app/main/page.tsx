'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MainWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

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
  text-decoration: none;

  &:hover {
    color: yellow;
    opacity: 0.8;
  }
`;

const Main = () => {
  return (
    <>
      <MainWrapper>
        <TextTitle>Types of Next.js 13 Rendering</TextTitle>
        <Link href="/ssg" style={{ textDecoration: 'none' }}>
          <PageType>SSG</PageType>
        </Link>
        <Link href="/ssr" style={{ textDecoration: 'none' }}>
          <PageType>SSR</PageType>
        </Link>
        <Link href="/axios" style={{ textDecoration: 'none' }}>
          <PageType>AXIOS CSR</PageType>
        </Link>
      </MainWrapper>
    </>
  );
};

export default Main;

// 03.28 SEO 고려해서 Link로 변경
// <PageType onClick={() => router.push('/ssg')}>SSG</PageType>
// <PageType onClick={() => router.push('/ssr')}>SSR</PageType>
// <PageType onClick={() => router.push('/axios')}>AXIOS CSR</PageType>
