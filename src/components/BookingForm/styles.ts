import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 800px;

  label {
    font-weight: 600;
    margin-top: 0.75rem;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  span {
    color: #d33;
    font-size: 0.8rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.75rem;
    border: none;
    background: #333;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }

  .error-box {
    background: #ffe6e6;
    color: #b30000;
    padding: 0.75rem 1rem;
    border: 1px solid #ffcccc;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;
