import styled from 'styled-components';

export const Container: any = styled.div``;
export const ChoicesContainer = styled.div<any>`
  font-family: 'Red Hat Display', sans-serif;
  height: 66px;
  width: 50%;
  background: #fff;
  margin-top: 20px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  border-left: 15px solid ${(props: any) => props.border};

  &:hover {
    background: #635ffa88;
    border-left: 15px solid #635ffa88;
  }
`;
