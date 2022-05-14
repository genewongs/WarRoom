import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: 0px 100px 0px 100px;
  display: flex;
  flex-direction: row;
  height: 80vh;
`;

export const Title = styled.div`
  padding-top: 12px;
  font-size: 2em;
  float: left;
  img {
    width: 23%;
  }
`;

export const MasterContainer = styled.div`
  min-height: 100%;
  max-height: 100%;
  min-width: 100%;
`;

export const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 60px;
  min-height: 60px;
  margin-bottom: 20px;
  padding-left: 3%;
  padding-right: 5%;
  background-color: #000000c2;
`;
