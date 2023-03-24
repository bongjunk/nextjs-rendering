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
import useSWR from 'swr';
import { DateTimeProps, fetchDataProps } from '../type';

const fetcher = (url: string) =>
  // cache: 'no-store' - 모든 요청에서 최신 데이터 받아오기(getServerSideProps 와 유사)
  // 매번 요청 시마다 refetch 된다.
  fetch(url, { cache: 'no-store' })
    .then((response) => response.json())
    .catch((e) => console.log(e));

// SSR(Server-Side Rendering)
const Ssr = () => {
  const {
    data: ssrData,
    error: ssrError,
    isLoading: ssrLoading,
  } = useSWR<fetchDataProps | any>(
    `https://jsonplaceholder.typicode.com/users`,
    fetcher
  );

  console.log('ssrData', ssrData);

  const {
    data: dateData,
    error: dateError,
    isLoading: dateLoading,
  } = useSWR<DateTimeProps | any>(`https://worldtimeapi.org/api/ip`, fetcher);
  const dateTime = dateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  return (
    <>
      {!ssrLoading && !dateLoading ? (
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
        {!ssrLoading ? (
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
      {!dateLoading ? (
        <DateTimeText>{dateFormat}</DateTimeText>
      ) : (
        <DateTimeText>loading..</DateTimeText>
      )}
    </>
  );
};

export default Ssr;
