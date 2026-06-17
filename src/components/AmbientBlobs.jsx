import React from 'react';

export default function AmbientBlobs() {
  return (
    <>
      <div className="fixed rounded-full blur-[120px] pointer-events-none z-0 w-[600px] h-[600px] bg-cyan-glow/8 -top-[10%] -left-[10%] animate-drift-1" aria-hidden="true"></div>
      <div className="fixed rounded-full blur-[120px] pointer-events-none z-0 w-[500px] h-[500px] bg-purple-glow/[0.07] bottom-[10%] -right-[8%] animate-drift-2" aria-hidden="true"></div>
      <div className="fixed rounded-full blur-[120px] pointer-events-none z-0 w-[400px] h-[400px] bg-[#f472b6]/5 top-[50%] left-[30%] animate-drift-3" aria-hidden="true"></div>
    </>
  );
}
