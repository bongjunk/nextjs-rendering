'use client';

import React, { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import { headers } from '../_type/tableType';
import axios from 'axios';
import {
  Title,
  TableWrapper,
  TableHead,
  TableData,
  DateTimeText,
} from '../styled';

// SSG(Static-Site Generation)
const Axios = () => {
  const [axiosData, setAxiosData] = useState<any[]>([]);
  const [dateTimeData, setDateTimeData] = useState<any>();

  const dateTime = dateTimeData?.datetime;
  const dateFormat = dateTime?.substring(0, 19);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        const data = res.data;
        setAxiosData(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dateTimeData = async () => {
      try {
        const res = await axios.get('https://worldtimeapi.org/api/ip');
        const data = res.data;
        setDateTimeData(data);
      } catch (e) {
        console.log(e);
      }
    };
    dateTimeData();
  }, []);

  // // Other uses
  // const [testAxiosData, setTestAxiosData] = useState<any>();
  // console.log('testAxiosData', testAxiosData);

  // useEffect(() => {
  //   const testAxios = () => {
  //     axios
  //       .get(`https://jsonplaceholder.typicode.com/users`)
  //       .then((response) => {
  //         const data = response.data;
  //         setTestAxiosData(data);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   testAxios();
  // }, []);

  return (
    <>
      {axiosData.length > 0 ? (
        <Title>CSR 방식으로 렌더링 되는 중..</Title>
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
        {axiosData?.length > 0 ? (
          <tbody>
            {axiosData.map((r: any, idx: number) => {
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
      {!dateTimeData ? (
        <DateTimeText>loading..</DateTimeText>
      ) : (
        <DateTimeText>{dateFormat}</DateTimeText>
      )}
    </>
  );
};

export default Axios;

// data fetch - async/await 사용 시 사용법
const fetchData = async () => {
  try {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};

// Other uses
const testAxios = () => {
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((error) => console.log(error));
};
