import styled from 'styled-components';

export const Title = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`;

export const TableWrapper = styled.table`
  border: 1px #a39485 solid;
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  height: 2.5rem;
  font-weight: bold;
  color: #fff;
  background: #73685d;
`;

export const TableData = styled.td<{ align?: any }>`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 1em 0.5em;
  vertical-align: middle;
  text-align: ${(props): string => (props?.align ? 'center' : 'left')};
`;

export const DateTimeText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;
