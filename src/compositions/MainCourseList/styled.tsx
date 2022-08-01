import { theme } from 'utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  border-radius: ${15}px;
  margin-right: ${25}px;
  margin-bottom: ${20}px;
  background-color: ${theme.WHITE};
  height: ${240}px;
  max-width: ${376}px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  margin-left: 20px;
`;

export const DetailsContainer = styled.div`
  padding-horizontal: ${21}px;
  padding-top: ${10}px;
`;

export const ImageContainer = styled.div`
  margin-top: ${1}px;
`;

export const UserStyles = { marginTop: 3 };
export const ImageStyles = {
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
};

export const TitleCourse = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  color: #2b2e4a;
  opacity: 0.8;
  margin-left: ${20}px;
`;

export const SubtitleText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #2b2e4a;
  opacity: 0.5;
  margin-top: 3px;
  margin-left: 6px;
`;

export const RatingContainer = styled.div`
  margin-right: ${20}px;
`;

export const RatingText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #2b2e4a;
  opacity: 0.5;
  margin-left: 7px;
  margin-top: 3px;
`;
