import styled from 'styled-components';

export const AttackList = styled.div`
  width: 180px;
  height: 95%;
  font-size: 12px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background: #52585c;
  border-radius: 3px;
  margin-right: 5px;
  h4 {
    text-align: center;
    text-shadow: 2px 2px 2px #000000d8;
  }
  & .listHeadAttacker {
    font-size: 1em;
    font-weight: bold;
    width: 100%;
    background-color: #222225;
    padding: 1px 0px 1px 5px;
    transition: all ease-in-out 0.2s;
    &:hover {
      cursor: pointer;
    }
  }
  & .active {
    text-shadow: 1px 1px 2px red;
    color: #ffcc00;
    transition: all ease-in-out 0.2s;
  }
  li {
    padding-left: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
  }
  li:last-child {
    padding-bottom: 4px;
  }
  > .attackListStyle {
    height: 25px;
    background-color: #ff0000a6;
  }
`;

export const DefenderStats = styled.div`
  width: 90px;
  height: 95%;
  border-radius: 3px;
  font-size: 12px;
  background: #52585c;
  h4 {
    text-align: center;
    text-shadow: 2px 2px 2px #000000d8;
  }
  & .defenderList {
    list-style: none;
    margin-bottom: 28px;
  }
  & .defenderListStyle {
    text-align: center;
    height: 20px;
    border-radius: 3px;
    background-color: #0037ffdf;
  }
  & .listHeadDefender {
    font-size: 1em;
    font-weight: bold;
    max-height: 18px;
    max-width: 100%;
    background-color: #388effd2;
    border-radius: 0 0 3px 3px;
    text-shadow: 2px 2px 2px #00000093;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 0px 5px;
    margin-bottom: 2px;
  }
`;
