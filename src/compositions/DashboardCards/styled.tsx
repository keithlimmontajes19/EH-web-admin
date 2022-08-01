import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction Row;
    overflow-x: scroll;
    scrollbar-width: none;
`;

export const StyledCard = styled.div`
  max-width: 250px;
  min-width: 250px;
  height: 130px;
  margin-right: 14px;
  border-radius: 15px;
  margin-bottom: 41px;
  padding: 40px 10px 50px 20px;
  background: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
`;

export const StyledTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #a2a1bd;
`;

export const StyledCount = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  color: #4c4b7b;
`;
