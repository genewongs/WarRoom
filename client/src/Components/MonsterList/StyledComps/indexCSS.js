import styled from 'styled-components';

export const MonsterListContainer = styled.div`
flex-grow: 1;
display: flex;
background-color: #0000009d;
flex-direction: column;
border-radius: 10px;
width: 23%;
height: 110%;
margin-bottom: 20px;

& .activeTab {
  background-color: #465b82c9;
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

export const MainButtons = styled.button`
font-family: 'Macondo', cursive !important;
font-size: 1.2rem;
text-shadow: 2px 2px 2px black;
width: 33.333333%;
height: 40px;
justify-content: center;
background-color: #1e242eeb;
color: white;
border: none;
border-bottom: 1px solid black;
cursor: pointer;
transition-duration: 0.2s;
&:hover {
  background: #465b82c9;
  color: white;
}
&:active {
  color: #FFD4CD;
};
`;

export const Header = styled.div`
font-size: large;
text-align: center;
`;
export const Overflow = styled.div`
max-width: 100%;
height: 100%;
overflow-y: scroll;
overflow-x: hidden;
scrollbar-width: none;
&::-webkit-scrollbar {
  display: none;
}
`;
