# Next.js SSG, SSR

    Next.js v13, styled-components, axios 사용

## 실행방법

    npm run dev

## pre-rendering

    Next.js는 렌더링 할 때, 기본적으로 pre-rendering을 해줌
    pre-rendering는 server단 에서 미리 각 페이지의 html을 생성하여 SEO 적용할 수 있게 하는 것

- 페이지마다 2가지 렌더링 방법을 선택적으로 사용가능
  - SSG(Static-Site Generation)
  - SSR(Server-Side Rendering)

## data fetch

```ts
const exData = use(fetchData());
const exData2 = use(testAxios());

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
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
```

## SSG, SSR, CSR 이란?

- SSG
  - 빌드를 진행할 때, 페이지들에 대한 각각의 문서를 생성해 static한 파일로 생성
  - 빈번한 업데이트가 필요하지 않은 정적 페이지 생성에 사용
- SSR
  - 페이지 요청 시마다, HTML 문서를 생성해서 반환해 줌
  - 요청 시마다 동적으로 페이지를 생성하여 다른 내용을 보여주어야 할 경우 사용
  - 페이지가 로드되기 전에 API를 호출
- CSR
  - 페이지가 로드된 후에 API를 호출

## styled-components `props` 작성요령

```ts
// ex.1
<DivStyled bgColor />
// ex.2
<DivStyled bgColor={true} />

// case 1
const DivStyled = styled.div<{ bgColor?: any }>`
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background-color: ${({ bgColor }) => bgColor ? 'red' : 'black'};
`;

// case 2
const DivStyled = styled.div(({ bgColor }) => `
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  background-color: ${bgColor ? 'red' : 'black'};
`);

// case 3
const DivStyled = styled.div`
  ${({ bgColor }) => `
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    background-color: ${bgColor ? 'red' : 'black'};
  `}
`;
```

## styled-components `media query` 작성요령

```ts
const DivStyled = styled.div`
  width: 100%;
  height: 100%;

  // 브라우저 폭이 768px 이하일 경우에 적용
  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
  }
`;
```

## styled-components, CSS-in-JS

- 참고 : https://beta.nextjs.org/docs/styling/css-in-js#styled-components

```
Warning: CSS-in-JS libraries which require runtime JavaScript are not currently supported in Server Components. Using CSS-in-JS with newer React features like Server Components and Streaming requires library authors to support the latest version of React, including concurrent rendering.

We’re working with the React team on upstream APIs to handle CSS and JavaScript assets with support for React Server Components and streaming architecture.

If you want to style Server Components, we recommend using CSS Modules or other solutions that output CSS files, like PostCSS or Tailwind CSS.
```

```
// 번역
경고: 런타임 자바스크립트가 필요한 CSS-in-JS 라이브러리는 현재 서버 컴포넌트에서 지원되지 않습니다. 서버 컴포넌트 및 스트리밍과 같은 최신 React 기능과 함께 CSS-in-JS를 사용하려면 라이브러리 작성자가 동시 렌더링을 포함한 최신 버전의 React를 지원해야 합니다.

저희는 React 서버 컴포넌트 및 스트리밍 아키텍처를 지원하는 CSS 및 자바스크립트 에셋을 처리하기 위해 업스트림 API에 대해 React 팀과 협력하고 있습니다.

서버 컴포넌트의 스타일을 지정하려면 CSS 모듈이나 PostCSS 또는 Tailwind CSS와 같이 CSS 파일을 출력하는 다른 솔루션을 사용하는 것이 좋습니다.
```
