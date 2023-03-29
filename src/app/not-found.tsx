'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div>
        <h2>Not Found - 404!</h2>
        <Link href="/">back home</Link>
      </div>
    </>
  );
}
