'use client';

import React, { use } from 'react';
import styled from 'styled-components';
import { headers } from '../_type/tableType';

const TableWrapper = styled.table`
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

const TableHead = styled.thead`
  height: 2.5rem;
  font-weight: bold;
  color: #fff;
  background: #73685d;
`;

const TableData = styled.td<{ align?: any }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 1em 0.5em;
  vertical-align: middle;
  text-align: ${(props) => (props?.align ? 'center' : 'left')};
`;

// SSR(Server-Side Rendering)
const Ssr = () => {
  const ssrData = use(fetchData());
  console.log('ssrData', ssrData);

  return (
    <>
      <TableWrapper>
        <TableHead>
          <tr>
            {headers.map((header: any, idx: number) => {
              return <th key={idx}>{header?.id}</th>;
            })}
          </tr>
        </TableHead>
        {ssrData?.length > 0 && (
          <tbody>
            {ssrData.map((r: any, idx: number) => {
              return (
                <tr key={idx}>
                  <TableData align>{r?.id}</TableData>
                  <TableData>{r?.name}</TableData>
                  <TableData>{r?.username}</TableData>
                  <TableData>{r?.email}</TableData>
                </tr>
              );
            })}
          </tbody>
        )}
      </TableWrapper>
    </>
  );
};

export default Ssr;

// data fetch
const fetchData = async () => {
  const userData = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    // cache: 'no-store' - 모든 요청에서 최신 데이터 받아오기(getServerSideProps 와 유사)
    cache: 'no-store',
  });
  const data = await userData.json();
  return data;
};
