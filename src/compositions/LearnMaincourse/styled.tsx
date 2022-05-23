import {theme} from 'utils/colors';
import styled from 'styled-components';

export const Container = styled.div`
  border-radius: ${15}px;
  margin-right: ${15}px;
  margin-bottom: ${20}px;
  background-color: ${theme.DEFAULT};
  height: ${240}px;
`;

export const FlexRow = styled.div`
  flex-direction: row;
  margin-top: ${21}px;
  margin-bottom: ${21}px;
`;

export const FlexContainer = styled.div`
  flex: 1;
  flex-direction: row;
  margin-top: ${2}px;
`;

export const DetailsContainer = styled.div`
  padding-horizontal: ${21}px;
  padding-top: ${10}px;
`;

export const DetailsRow = styled.div`
  flex-direction: row;
  margin-top: ${2}px;
`;

export const UserStyles = {marginTop: 3};
export const ImageStyles = {borderTopRightRadius: 20, borderTopLeftRadius: 20};