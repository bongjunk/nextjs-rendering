// data fetch
// export async function fetchData(){
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
//     // cache: 'force-cache' - 기본값(getStaticProps와 유사), default 값으로 생략가능
//     cache: 'force-cache',
//     // next: { revalidate : 10} - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const data = await res.json();
//   return data;
// };

import useSWR from 'swr';

interface SsgProps {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

interface DateTimeProps {
  datetime: string;
}

const fetcher = (url: string) =>
  fetch(url, { cache: 'force-cache' })
    .then((response) => response.json())
    .catch((e) => console.log(e));

// data fetch
export const fetchData = async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      // cache: 'force-cache' - 기본값(getStaticProps와 유사), default 값으로 생략가능
      cache: 'force-cache',
      // next: { revalidate : 10} - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사) - ISR
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: SsgProps = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const dateTimeData = async () => {
  try {
    const res = await fetch(`https://worldtimeapi.org/api/ip`, {
      cache: 'force-cache',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data: DateTimeProps = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
