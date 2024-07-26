import { ContentWrapper, GlobalStyle } from "./global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <ContentWrapper>
        <Router />
        <GlobalStyle />
      </ContentWrapper>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
