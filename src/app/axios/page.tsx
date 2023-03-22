'use client';

import React, { use } from 'react';
import styled from 'styled-components';
import { headers } from '../_type/tableType';
import axios from 'axios';

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

// SSG(Static-Site Generation)
const Axios = () => {
  const axiosData = use(fetchData());
  // const axiosTest = testAxios();

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
        {axiosData?.length > 0 && (
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
        )}
      </TableWrapper>
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

// export const fetchData = async () => {
//   try {
//     const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
//     const data = res.data;
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

// Other uses
const testAxios = () => {
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
