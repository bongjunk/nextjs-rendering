'use client';

import React, { use, useEffect } from 'react';
import styled from 'styled-components';
import { headers } from '../_type/tableType';

const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

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

const DateTimeText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

// SSR(Server-Side Rendering)
const Ssr = () => {
  const ssrData = use(fetchData());
  const ssrDateData = use(dateTimeData());

  // const ssrDat = await fetchData();
  // const ssrDateDat = await dateTimeData();

  const dateTime = ssrDateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  // console.log('ssrDateData', ssrDateData);

  return (
    <>
      {ssrData.length > 0 ? (
        <Title>SSR 방식으로 렌더링 되는 중..</Title>
      ) : (
        <Title>loading..</Title>
      )}
      <TableWrapper>
        <TableHead>
          <tr>
            {headers.map((header: any, idx: number) => {
              return <th key={idx}>{header?.id}</th>;
            })}
          </tr>
        </TableHead>
        {ssrData?.length > 0 ? (
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
        ) : (
          <tbody>
            <tr>
              <td colSpan={4} align="center">
                loading..
              </td>
            </tr>
          </tbody>
        )}
      </TableWrapper>
      {!ssrDateData ? (
        <DateTimeText>loading..</DateTimeText>
      ) : (
        <DateTimeText>{dateFormat}</DateTimeText>
      )}
    </>
  );
};

export default Ssr;

// data fetch
const fetchData = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    // cache: 'no-store' - 모든 요청에서 최신 데이터 받아오기(getServerSideProps 와 유사)
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

const dateTimeData = async () => {
  const res = await fetch(`https://worldtimeapi.org/api/ip`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};
