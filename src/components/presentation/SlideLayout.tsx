import { ReactNode } from "react";

interface SlideLayoutProps {
  children: ReactNode;
  className?: string;
}

const SlideLayout = ({ children, className = "" }: SlideLayoutProps) => {
  return (
    <div className={`w-[1920px] h-[1080px] relative overflow-hidden slide-gradient-bg ${className}`}>
      {children}
    </div>
  );
};

export default SlideLayout;
