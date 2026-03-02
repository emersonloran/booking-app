import styled from "styled-components";

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
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

export const DeleteButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #d93636;
  }
`;
