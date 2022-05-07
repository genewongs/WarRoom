import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext.js';
import List from './List';
import Create from './Create';
import Details from './Details';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  width: 23%;
`;

const MainButtons = styled.button`
width: 33.333333%;
border-radius: 4px;
justify-content: center;
padding: 3%;
box-shadow: 0 5px 5px rgba(17, 16, 62, 0.1);
font-size: 1vw;
font-weight: 300;
color: black;
background-color: #fff;
border: 2px solid #FFD4CD;
border-radius: 3px;
cursor: pointer;
transition-duration: 0.4s;
&:hover {
box-shadow: 0 0 5px 5px rgba(17, 16, 62, 0.15);
background: #FFD4CD;
color: white;
&:active {
  color: #FFD4CD;
};
`;
function MonsterList() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  console.log('currentUser in MonsterList', currentUser);
  const [render, setRender] = useState('List');
  const renderComponent = function renderComponent() {
    if (render === 'List') {
      return <List />;
    }
    if (render === 'Create') {
      return <Create />;
    }
    return <Details />;
  };
  return (
    <MonsterListContainer>
      <div>
        <MainButtons type="button" onClick={() => setRender('List')}>List</MainButtons>
        <MainButtons type="button" onClick={() => setRender('Create')}>Create</MainButtons>
        <MainButtons type="button" onClick={() => setRender('Details')}>Details</MainButtons>
      </div>
      {renderComponent()}
    </MonsterListContainer>
  );
}

export default MonsterList;
