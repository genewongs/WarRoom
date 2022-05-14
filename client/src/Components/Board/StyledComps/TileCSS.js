import styled from 'styled-components';

const TileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  width: 100%;
  height: 100%;
  /* background-color: red; */
  /* border: 1px solid black; */
  background-image: url(${(props) => `./assets/square${props.number}.png`});
  background-size: cover;
`;

export default TileContainer;
