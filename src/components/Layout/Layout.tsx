import { ReactNode } from "react";
import ContentContainer from "./ContentContainer";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  isFullWidth?: boolean;
  children: ReactNode;
};

export default function Layout({ children, isFullWidth = false }: LayoutProps) {
  return (
    <div>
      <Header />
      <div>
        <div>
          <ContentContainer isFullWidth={isFullWidth}>
            {children}
          </ContentContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
