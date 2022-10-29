import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 15px;
  //   display: flex;
  //   flex-direction: row;
  min-height: 105px;
  min-width: 105px;
  max-height: 105px;
  max-width: 105px;
  box-shadow: 0px 4px 8px rgba(10, 130, 0, 0.05);
  border-radius: 15px;
  margin-right: 25px;
`;

export const Folderimg = styled.img`
  cursor: pointer;
  padding: 25px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-width: 105px;
  max-width: 105px;
`;

export const StyledText = styled.p`
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  text-align: center;
  /* Hub Headings */

  color: #4c4b7b;
  padding-top: 10px;
`;
