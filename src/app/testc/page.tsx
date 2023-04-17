'use client';

import React, { useState } from 'react';

interface IObj {
  lg: string;
  samsung: string;
}

interface Fruits {
  apple: string;
  grape: string;
  orange: string;
  mandarin: string;
}

const TestComp = () => {
  const [count, setCount] = useState<number>(0);

  const cower: IObj | any = {
    lg: 'gram',
    samsung: 'galaxy',
  };

  if (cower) {
    for (const key in cower) {
      const value = cower[key];
      const value2 = Object.keys(cower);
      const value3 = Object.values(cower);

      console.log('key', key);
      console.log('value', value);
      console.log('value2', value2);
      console.log('value3', value3);
    }
  }

  function hello2<T>(msg: T): T {
    console.log('msg', msg, typeof msg);
    return msg;
  }

  hello2('hi');
  hello2(123);

  // <> 심볼이 jsx가 아니라는 확신을 주면 된다.
  const hello3 = <T,>(x: T): T => {
    console.log('x', x, typeof x);
    return x;
  };

  hello3('hi');

  const hello4 = <T extends {}>(x: T): T => {
    console.log('x', x, typeof x);
    return x;
  };

  hello4('hi');

  // T는 항상 Fruits을 포함하고 있어야 한다.
  function helloFruits<T extends Fruits>(fruit: T): T {
    console.log('fruit', fruit);
    return fruit;
  }

  // keyof 옵션을 사용하면 apple, grape, orange, mandarin
  function helloFruits2<T extends keyof Fruits>(fruit: T): T {
    console.log('fruit', fruit);
    return fruit;
  }

  const fruits = {
    apple: 'apple',
    grape: 'grape',
    orange: 'orange',
    mandarin: 'mandarin',
  };

  helloFruits(fruits);
  helloFruits2('apple');

  const handleAlertClick = () => {
    console.log('경고창 노출하는 이벤트');
    alert('Warning!');
  };

  const handleCountClick = () => {
    console.log('숫자가 증가하는 이벤트');
    setCount((prev) => prev + 1);
  };

  const handleResetClick = () => {
    setCount(0);
  };

  return (
    <>
      <div>
        <button onClick={() => handleAlertClick()}>경고노출</button>
        <p>{count}</p>
        <button onClick={() => handleCountClick()}>숫자증가</button>
        <button onClick={() => handleResetClick()}>리셋</button>
      </div>
    </>
  );
};

export default TestComp;
