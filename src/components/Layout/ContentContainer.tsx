import { ReactNode } from "react";

type ContentContainerProps = {
  isFullWidth: boolean;
  children: ReactNode;
};
const ContentContainer = ({ children, isFullWidth }: ContentContainerProps) => {
  if (isFullWidth) {
    return <>{children}</>;
  } else {
    return (
      <div className="se-container">
        <div className="se-container__section">{children}</div>
      </div>
    );
  }
};

export default ContentContainer;
