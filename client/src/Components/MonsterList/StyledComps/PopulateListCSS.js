import styled from 'styled-components';

export const Icon = styled.img`
  min-height: 100px;
  max-height: 100px;
  min-width: 100px;
  max-width: 100px;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(-45deg, #835d1a, #BF953F, #FBF5B7 ,#BF953F, #835d1a) 1;
  cursor: pointer;
`;
export const MonsterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px;

  h4 {
    font-weight: 200;
    color: #fff0cf;
    text-shadow: 2px 2px 2px #171512;
  }
`;
export const ListContainer = styled.div`
  background-image: linear-gradient(to top, rgba(255,0,0,0), #526e9f34);
`;
