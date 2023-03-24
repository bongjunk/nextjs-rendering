'use client';

import React from 'react';
import { headers } from '../_type/tableType';
import useSWR from 'swr';
import {
  Title,
  TableWrapper,
  TableHead,
  TableData,
  DateTimeText,
} from '../styled';
import { DateTimeProps, fetchDataProps } from '../type';

// cache: 'force-cache' - 기본값(getStaticProps와 유사), default 값으로 생략가능
const fetcher = (url: string) =>
  // next: { revalidate : 10} - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사) - ISR
  fetch(url, { cache: 'force-cache' })
    .then((response) => response.json())
    .catch((e) => console.log(e));

// SSG(Static-Site Generation)
const Ssg = () => {
  const {
    data: ssgData,
    error: ssgError,
    isLoading: ssgLoading,
  } = useSWR<fetchDataProps | any>(
    `https://jsonplaceholder.typicode.com/users`,
    fetcher
  );

  const {
    data: dateData,
    error: dateError,
    isLoading: dateLoading,
  } = useSWR<DateTimeProps>(`https://worldtimeapi.org/api/ip`, fetcher);
  const dateTime = dateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  return (
    <>
      {!ssgLoading && !dateLoading ? (
        <Title>SSG 방식으로 렌더링 되는 중..</Title>
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
        {!ssgLoading ? (
          <tbody>
            {ssgData.map((r: any, idx: number) => {
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

export default Ssg;
