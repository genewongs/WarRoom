import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext.js';
import List from './List';
import Create from './Create';
import Details from './Details';

const MonsterListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: #0000009d;
  flex-direction: column;
  border-radius: 10px;
  width: 23%;
  margin-bottom: 20px;

  & .activeTab {
    background-color: #15b151;
  }

  & .buttons-container {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    button:nth-child(1) {
      border-radius: 10px 0px 0px 0px;
      border-right: 1px solid black;
    }
    button:nth-child(3) {
      border-radius: 0px 10px 0px 0px;
      border-left: 1px solid black;
    }
  }
`;

const MainButtons = styled.button`
  width: 33.333333%;
  height: 40px;
  background-color: #162626;
  justify-content: center;
  font-size: 1rem;
  text-shadow: 2px 2px 2px black;
  color: white;
  border: none;
  cursor: pointer;
  transition-duration: 0.2s;
  &:hover {
    background: #15b151;
    color: white;
  }
  &:active {
    color: #FFD4CD;
  };
`;

function MonsterList() {
  const {currentUser, setCurrentUser} = useContext(UserContext);
  console.log('currentUser in MonsterList', currentUser);
  const [activeTab, setActiveTab] = useState('List');
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
      <div className="buttons-container">
        <MainButtons
          className={activeTab === 'List' ? 'activeTab' : ''} type="button"
          name='List'
          onClick={() => {
            setRender('List');
            setActiveTab('List');
            }}>List</MainButtons>
        <MainButtons
          className={activeTab === 'Create' ? 'activeTab' : ''}
          type="button"
          name='Create'
          onClick={() => {
            setRender('Create')
            setActiveTab('Create');
            }}>Create</MainButtons>
        <MainButtons
          className={activeTab === 'Details' ? 'activeTab' : ''}
          type="button"
          name='Details'
          onClick={() => {
            setRender('Details')
            setActiveTab('Details');
          }}>Details</MainButtons>
      </div>
      {renderComponent()}
    </MonsterListContainer>
  );
}

export default MonsterList;
