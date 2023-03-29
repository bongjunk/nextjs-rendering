'use client';

import React from 'react';
import styled from 'styled-components';
import Main from './main/page';

const RootLayout = styled.div`
  width: 100vw;
  height: 100vh;
  // background-color: #000;
  margin: 0;
  padding: 0;
  position: relative;
`;

export default function Home() {
  return (
    <>
      <RootLayout>
        <Main />
      </RootLayout>
    </>
  );
}
