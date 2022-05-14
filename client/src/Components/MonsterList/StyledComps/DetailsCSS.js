import styled from 'styled-components';

export const DetailsContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #131516;
width: 100%;
max-height: 100%;
min-height: 100%;
z-index: 5;
border-radius: 5px;

& .edit {
  margin: 0 auto;
}
& .delete {
  background-color: #ff0000;
  margin: 0 auto;
  margin-top: 20px;
}
`;

export const TopContainer = styled.div`
  display: flex;
  margin: 15px;
  font-family: "Macondo", cursive !important;
`;

export const IconContainer = styled.img`
  width: 33%;
  height: auto;
  display: flex;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
      -45deg,
      #835d1a,
      #bf953f,
      #fbf5b7,
      #bf953f,
      #835d1a
    )
    1;
`;

export const MonsterName = styled.div`
  display: flex;
  width: 100%;
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0), #526e9f34);
  border-radius: 3px;
  font-size: x-large;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-align: center;
  color: #cad9eb;
  text-shadow: 1px 1px 1px #000000;
`;

export const Description = styled.div`
  display: flex;
  width: 100%
  font-size: large;
  justify-content: center;
  align-items: center;
  // border: solid 1px;
  text-transform: uppercase;
  font-style: italic;
  color: #97b3d2;
  background-color: #1a1d23c5;
  text-shadow: 1px 1px 1px #000000;
`;

export const StatsContainer = styled.div`
  margin: 15px;
`;

export const AttacksContainer = styled.div`
  margin: 15px;
  text-transform: uppercase;

  tr:nth-last-child() {
    border-bottom: none !important;
  }

  & .attackContainer {
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid white;
    h4 {
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        #3e497a7d
      );
    }
  }
`;

export const AttackTitle = styled.div`
  font-size: large;
  text-align: center;
  background-color: #25293e;
  border-bottom: 1px solid white;
`;

export const StyledLeftTD = styled.div`
  width: 100px;
`;

export const StyledAttackTable = styled.table`
  margin-left: 1em;
`;
