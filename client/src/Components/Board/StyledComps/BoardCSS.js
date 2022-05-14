import styled from 'styled-components';

export const BoardStyled = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  grid-template-rows: repeat(${(props) => props.dimension || 8}, ${(props) => 90 / props.dimension || 8}%);
  height: 100%;
  width: 100%;
  margin-top: -30px;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 800px; */
  /* width: 800px; */
  /* min-height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-width: 100%; */
  max-width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
`;

export const ErrorMessage = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20px;
  opacity: 0;
  color: #ca0000;
  transition: all ease-in-out 0.3s;
  &.show {
    opacity: 1 !important;
    color: #ca0000;
    transition: all ease-in-out 0.3s;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
`;

export const BattleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100%;
  background-color: #1d1f25;
  border-radius: 5px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;
