'use client';

import React from 'react';
import { headers } from '../_type/tableType';
import {
  Title,
  TableWrapper,
  TableHead,
  TableData,
  DateTimeText,
} from '../styled';
import useSWR, { SWRConfig } from 'swr';
import { DateTimeProps, fetchDataProps } from '../_type/fetchType';

const fetcher = (url: string) =>
  // cache: 'no-store' - 모든 요청에서 최신 데이터 받아오기(getServerSideProps 와 유사)
  // 매번 요청 시마다 refetch 된다.
  fetch(url, { cache: 'no-store' })
    .then((response) => response.json())
    .catch((e) => console.log(e));

const SsrTable = () => {
  const {
    data: ssrData,
    error: ssrError,
    isLoading: ssrLoading,
  } = useSWR<fetchDataProps | any>(
    `https://jsonplaceholder.typicode.com/users`
  );

  const {
    data: dateData,
    error: dateError,
    isLoading: dateLoading,
  } = useSWR<DateTimeProps | any>(`https://worldtimeapi.org/api/ip`);
  const dateTime = dateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  if (ssrData === undefined) return null;
  if (dateData === undefined) return null;

  return (
    <>
      <Title>SSR 방식으로 렌더링 되는 중..</Title>
      <TableWrapper>
        <TableHead>
          <tr>
            {headers.map((header: any, idx: number) => {
              return <th key={idx}>{header?.id}</th>;
            })}
          </tr>
        </TableHead>
        {ssrData && (
          <tbody>
            {ssrData?.map((r: any, idx: number) => {
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
      <DateTimeText>{dateFormat}</DateTimeText>
    </>
  );
};

// SSR(Server-Side Rendering)
const Ssr = () => {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <SsrTable />
      </SWRConfig>
    </>
  );
};

export default Ssr;
