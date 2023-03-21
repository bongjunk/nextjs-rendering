'use client';

import React from 'react';
import styled from 'styled-components';
import Main from './main/page';

const RootLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #000;
  margin: 0;
  padding: 0;
  display: flex;
  position: relative;
`;

const PageRoot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function Home() {
  return (
    <>
      <RootLayout>
        <PageRoot>
          <Main />
        </PageRoot>
      </RootLayout>
    </>
  );
}
