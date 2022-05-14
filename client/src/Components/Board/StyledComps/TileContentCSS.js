import styled from 'styled-components';

export const MonsterDiv = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

export const AttackCardStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 100%;
  width: 285px;
  height: 140px;
  background-color: #1f1f23;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #00000076;
  z-index: 10;
  opacity: 1;
`;
