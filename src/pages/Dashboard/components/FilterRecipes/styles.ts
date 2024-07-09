import styled from "styled-components";
import * as Checkbox from "@radix-ui/react-checkbox";

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  display: wrap;

  h1 {
    margin-bottom: 1rem;
    padding: 0.5rem 1.75rem;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  div {
    display: flex;
  }
`;

export const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxRoot = styled(Checkbox.Root)`
  background-color: transparent;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  cursor: pointer;
`;

export const CheckboxIndicator = styled(Checkbox.Indicator)`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  padding-left: 12px;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const FilterButton = styled.div`
  width: 200px;
  margin: 3rem auto;
  border: 3px solid black;
  border-radius: 8px;
  background: #ffdb24;
  font-weight: bold;
  padding: 0.25rem 0;
  font-size: 1.5rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #fcb500;
    transition: 0.2s;
  }
`;
