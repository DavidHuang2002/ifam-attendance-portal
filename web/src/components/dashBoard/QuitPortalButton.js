
import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function QuitPortal() {
  return(
    <nav className = 'flex-between w-full mb-16 pt-3'>
      <div style={{position: 'fixed', bottom: 60, left: 50, textAlign: 'center',}}>
      <Link href='../' className='black_btn' >
        <button type = "dashed" ghost>
          Quit Portal
        </button>
       
      </Link>
      </div>
      </nav>
);
}

/*
const QuitPortal = () => {
  return(
      <nav className = 'flex-between w-full mb-16 pt-3'>
        <div>
        <Link href='/create-prompt' className='black_btn' >
          <button type = "button" onClick={signOut} className='outline_btn'>
            Quit
          </button>
         
        </Link>
        </div>
        </nav>
  );
};

export default QuitPortal

/*
export function QuitButton() {
  const QuitButton = () => {
    const handleClick = () => {
      console.log('Button clicked!');
      // Add any functionality you want here
    };
  return (
    <div>
      <h1>This is Any Page</h1>
      <Button type="dashed" onClick={handleClick}>Dashed Button</Button>
    </div>
   );
  };
}
*/

/*
import { Button, Flex } from 'antd';
const App = () => (
    <Flex gap="small" wrap="wrap">
      <Button type="primary">Primary Button</Button>
      <Button type="dashed">Dashed Button</Button>
    </Flex>
  );
  export default App;

  */