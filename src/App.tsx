import { BookingsPage } from "./pages/BookingsPage";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default function App() {
  return (
    <AppContainer>
      <BookingsPage />
    </AppContainer>
  );
}
