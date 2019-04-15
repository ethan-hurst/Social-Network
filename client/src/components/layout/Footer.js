import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white mt-5 p-4 text-center fixed-bottom">
        Copyright &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Social Network&trade;
      </footer>
    </div>
  );
}
