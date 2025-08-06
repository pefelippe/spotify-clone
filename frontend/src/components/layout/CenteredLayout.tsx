import React from 'react';

interface CenteredLayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export const CenteredLayout = ({ children, maxWidth = 'max-w-md' }: CenteredLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black-bg p-6">
      <div className={`w-full ${maxWidth}`}>
        {children}
      </div>
    </div>
  );
};
