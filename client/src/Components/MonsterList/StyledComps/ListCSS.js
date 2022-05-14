import styled from 'styled-components';

export const ListContainer = styled.div`
display: flex;
flex-direction: column;
background-color: #131516;
width: 100%;
max-height: 100%;
min-height: 100%;
border: 10px;
border-radius: 0px 0px 5px 5px;
z-index: 5;
`;
export const Header = styled.div`
font-family: 'Macondo', cursive !important;
max-height: 4%;
min-height: 4%;
font-size: large;
text-align: center;
padding: 10px 0px;
background-color: #181b1e;
text-shadow: 2px 2px 2px #00000078;
border-bottom: 1px solid #ffffff9f;
`;

export const CharacterContainer = styled.div`
display: flex;
flex-direction: column;
min-height: 100%;
max-height: 100%;
`;

export const BoardCard = styled.div`
flex-grow: 1;
min-height: calc(45.5% - 20px);
max-height: calc(45.5% - 20px);
overflow-y: scroll;
scrollbar-width: none;
&::-webkit-scrollbar {
  display: none;
}
border-radius: 0px 0px 10px 10px;
`;
