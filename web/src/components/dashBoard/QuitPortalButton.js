
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