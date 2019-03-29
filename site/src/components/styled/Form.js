import styled from 'styled-components';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  min-width: 200px;
  padding-bottom: 20px;
  border: 1px solid #0002;
  border-radius: 6px;
  & > div {
    margin: 10px 20px;
  }
`;

export default Form;
