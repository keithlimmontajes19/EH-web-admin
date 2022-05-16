import styled from "styled-components";
import { theme } from "utils/colors"


export const Container = styled.div``;
export const BoardContainer: any = styled.div`
  margin: 36px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  border-radius: 15px;
  justify-content: space-around;
`;

export const HeaderContainer = styled.div`
  font-weight: bold;
  border-top-right-radius:15px;
  border-top-left-radius:15px;
  padding: 20px;
 
  background:${theme.HEADER};
  display:flex;
  flex-direction:row;
  justify-content:space-between;
`;
export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;
export const Darkdot = styled.div`
  background: dark;
  border-radius: 90%;
  height: 5px;
  width: 5px;
`;
