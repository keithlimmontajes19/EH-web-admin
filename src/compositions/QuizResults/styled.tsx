import styled from 'styled-components';

export const Container = styled.div``;
export const TextStyled = styled.p`
  font-family: 'Red Hat Display', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  color: #635ffa;
`;

export const SubText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  color: #000000;
  opacity: 0.8;
  margin-top: -20px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  left: 70%;
  right: 4.38%;
  top: 75%;
  bottom: 4.59%;
  display: flex;
  flex-direction: row;

  &:hover {
    button {
      background: #635FFA;
      color: #fff;
      border: none;
    }
  }

  .next-button {
    width: 250px;
    height: 48px;
    color: #635FFA;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    
    &:hover {
      background: #fff;
      color: #635FFA;
    }
  }

  .back-button {
    width: 250;
    height: 48px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    border: none;
    background: #635FFA;

    &:hover {
      background: #fff;
      color: #635FFA;
    }
  }
`;
