import styled from 'styled-components';

export const CardStyled = styled.div`
  width: 547px;
  max-height: 452px;
  padding: 24px;
  background: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 5px 20px -5px rgba(43, 46, 74, 0.2);
  overflow-y: auto;
  scrollbar-width: none;
`;

export const TextStyled = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: #635ffa;
`;

export const MarginTop = styled.div`
  margin-bottom: 32px;
`;

export const FlexRow = styled.div`
  flex: 1;
  display: flex;
  margin-top: 14px;
  flex-direction: row;
`;

export const FlexColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  flex: 1;
  display: flex;
`;

export const FlexSpaceBetween = styled.div`
  flex: 1;
  display: flex;
  margin-left: 30px;
`;

export const TitleStyled = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
  color: #2b2e4a;
  opacity: 0.8;
`;
export const SubtitleStyled = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #2b2e4a;
  opacity: 0.5;
  margin-left: 9px;
`;

export const ProgressContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 20px;
`;
