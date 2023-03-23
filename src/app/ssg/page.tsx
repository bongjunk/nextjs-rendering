'use client';

import React, { use } from 'react';
import styled from 'styled-components';
import { dateTimeData, fetchData } from '../../../lib/server/components/ssg';
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
  text-align: ${(props): string => (props?.align ? 'center' : 'left')};
`;

const DateTimeText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

// SSG(Static-Site Generation)
const Ssg = () => {
  const ssgData = use(fetchData());
  const ssgDateData = use(dateTimeData());

  const dateTime = ssgDateData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  return (
    <>
      {ssgData.length > 0 ? (
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
        {ssgData?.length > 0 ? (
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
      {!ssgDateData ? (
        <DateTimeText>loading..</DateTimeText>
      ) : (
        <DateTimeText>{dateFormat}</DateTimeText>
      )}
    </>
  );
};

export default Ssg;
