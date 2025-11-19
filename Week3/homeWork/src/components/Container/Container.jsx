import React from "react";

const Container = ({ children }) => {
  return (
    <main
      className="max-w-[1200px] mx-auto px-4 w-full py-8 flex flex-col items-center">
      {children}
    </main>
  );
};

export default Container;
