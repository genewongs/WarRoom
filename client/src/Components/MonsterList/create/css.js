import styled from 'styled-components';

const CSS = {
  CreateContainer: styled.div`
    margin: 2% 1% 1%;
    display: flex;
    flex-direction: column;
    border: 1px solid green;
    width: 95%;
    z-index: 100;
  `,
  Input: styled.input`
    height: 12px;
    padding: 0.5em;
    border-width: 1px;
    border-style: inset;
    border-color: #a6de0b;
    border-radius: 3px;
    width: 50%;
    margin-bottom: 0.5em;
    margin-left: 2px;
    box-shadow: 0 5px 5px rgba(17, 16, 62, 0.1);
    ::placeholder {
      color: #6e0d15;
    }
  `,
  SelectedIcon: styled.img`
    width: 15%;
    bborder: 3px solid green;
  `,
  NotSelected: styled.img`
    width: 15%;
    padding 5 px;
  `,
  MainButtons: styled.button`
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
  `,
  DivInputs: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Close: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 17vw;
  `,
};

export default CSS;
