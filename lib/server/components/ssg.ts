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

// data fetch
export async function fetchData() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`, {
      // cache: 'force-cache' - 기본값(getStaticProps와 유사), default 값으로 생략가능
      cache: 'force-cache',
      // next: { revalidate : 10} - 10초 후 새 요청오면 페이지 새로 생성 (revalidate옵션이 있는 getStaticProps와 유사)
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function dateTimeData() {
  try {
    const res = await fetch(`https://worldtimeapi.org/api/ip`, {
      cache: 'force-cache',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
