import styled from 'styled-components';

export const BattleCardDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #20222a;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0px;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(-45deg,#0025ff,#89c5ff,#dddddd,#89c5ff,#0025ff) 1;
    margin: 4px 8px;
  }

  & .icon {
    cursor: pointer;
    align-self: center;
  }
`;

export const BattleCardLeft = styled.div`
  flex-grow: 1;
  width: 100%;
  margin: 0px 20px;
  border-radius: 10px;
  border-top: 1px solid black;

  select {

  }
`;

export const AttackListStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #222129;
  border-radius: 5px;
`;

export const AttackListItem = styled.div`
  width: 100%;
  font-size: .9em;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 20px;
  margin: 5px 0px;
  border-radius: 3px;
  transition: all ease-in-out 0.1s;
  background-color: #2d3443;
  box-shadow: 2px 2px 2px #161617;

  &.selected {
    box-shadow: 5px 4px 3px #49546e;
    background-image: linear-gradient(to right, rgba(255,0,0,0), #60719a);
  }

  &:hover{
    transition: all ease-in-out 0.1s;
    transform: scale(1.02);
    background-color: #3c4361cd;
  }
`;

export const BattleCardRight = styled.div`
  flex-grow: 1;
  width: 100%;
  margin: 0px 20px;
  border-radius: 10px;
  border-top: 1px solid black;
`;

export const BattleCardRightInfo = styled.div`
  width: 100%;
  font-size: .9em;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 10px 20px;
  margin: 5px 0px;
  border-radius: 3px;
`;

export const MonsterHeader = styled.div`
  font-family: 'Macondo', cursive;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 2px #161617;
  width: 100%;
  margin-top: 20px;
  border-radius: 3px;
  background-image: linear-gradient(to top, rgba(255,0,0,0), #ff000078);
`;

export const MonsterHeader2 = styled.div`
  font-family: 'Macondo', cursive;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 2px #161617;
  width: 100%;
  margin-top: 20px;
  border-radius: 3px;
  background-image: linear-gradient(to top, rgba(255,0,0,0), #0033ff99);
`;
