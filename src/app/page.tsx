'use client';

import Scale from './scale/[id]/page';
import SignIn from './signin/page';

export default function Home() {
  const token = 'ta'; //window.localStorage.getItem("token") as string;

  return token ? <Scale /> : <SignIn />;
}
