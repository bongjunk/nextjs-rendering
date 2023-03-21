import React, { use } from 'react';

const Ssg = () => {
  const ssrData = use(fetchData());
  console.log('ssrData', ssrData);
  return (
    <>
      <p>ssg page</p>
      <p>ssg page</p>
      <p>ssg page</p>
      <p>ssg page</p>
      <p>ssg page</p>
    </>
  );
};

export default Ssg;

export const fetchData = async () => {
  const userData = await fetch(`https://jsonplaceholder.typicode.com/users`, {
    cache: 'force-cache',
  });
  const dataa = await userData.json();
  console.log('userData', userData, 'dataa', dataa);
  return dataa;
};
