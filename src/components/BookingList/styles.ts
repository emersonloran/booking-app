import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ListItem = styled.div`
  width: 100%;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
  }

  strong {
    font-size: 1.1rem;
  }

  span {
    margin-top: 4px;
  }

  small {
    color: #777;
    margin-top: 6px;
  }
`;
