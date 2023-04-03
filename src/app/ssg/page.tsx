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
import { DateTimeProps, fetchDataProps } from '../_type/fetchType';

// cache: 'force-cache' - 기본값(getStaticProps와 유사), default 값으로 생략가능
const fetcher = (url: string) =>
  // next: { revalidate : 10} - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사) - ISR
  fetch(url, { cache: 'force-cache' })
    .then((response) => response.json())
    .catch((e) => console.log(e));

// 아래 사용자 구성 요소를 렌더링하기 전에 리소스를 미리 로드합니다.
// 이는 waterfall 현상을 막을 수 있습니다.
// 버튼이나 링크를 호버할 때도 preload를 시작할 수 있습니다.
// preload('https://jsonplaceholder.typicode.com/users', fetcher);
// preload('https://worldtimeapi.org/api/ip', fetcher);

// SSG(Static-Site Generation)
const Ssg = () => {
  const {
    data: ssgData,
    error: ssgError,
    isValidating: ssgLoading,
  } = useSWR<fetchDataProps | any>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  );

  const {
    data: dateData,
    error: dateError,
    isLoading: dateLoading,
  } = useSWR<DateTimeProps>('https://worldtimeapi.org/api/ip', fetcher);
  const dateTime = dateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  if (ssgData === undefined) return null;
  if (dateData === undefined) return null;

  return (
    <>
      <Title>SSG 방식으로 렌더링 되는 중..</Title>
      <TableWrapper>
        <TableHead>
          <tr>
            {headers.map((header: any, idx: number) => {
              return <th key={idx}>{header?.id}</th>;
            })}
          </tr>
        </TableHead>
        {ssgData && (
          <tbody>
            {ssgData?.map((r: any, idx: number) => {
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

export default Ssg;
