import { ContentWrapper, GlobalStyle } from "./global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routes";

function App() {
  return (
      <BrowserRouter>
        <ContentWrapper>
          <Router />
          <GlobalStyle />
        </ContentWrapper>
      </BrowserRouter>
  );
}

export default App;
