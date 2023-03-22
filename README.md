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

## SSG, SSR 이란?

- SSG
  - 빌드를 진행할 때, 페이지들에 대한 각각의 문서를 생성해 static한 파일로 생성
  - 빈번한 업데이트가 필요하지 않은 정적 페이지 생성에 사용
- SSR
  - 페이지 요청 시마다, HTML 문서를 생성해서 반환해 줌
  - 요청 시마다 동적으로 페이지를 생성하여 다른 내용을 보여주어야 할 경우 사용

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
