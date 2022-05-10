import styled from 'styled-components';

const CSS = {
  CreateContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 5;

    & .confirm-monster {
      height: 30px;
      border:none;
      border-radius: 0px 0px 5px 5px;
      color: white;
      cursor: pointer;
      margin-bottom: 40px;
      background-color: #215a4f;
      &:hover {
        background-color: #2fa18a;
      }
    }

    & .attribute {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      background-color: #1c2322;

      h4 {
        font-weight: 250;
        font-size: 1em;
        margin-bottom: 10px;
        background-color: #304242;
        min-width: 100%;
        text-align: center;
        border-radius: 0px 0px 3px 3px;
        box-shadow: 2px 2px 2px #2f2f384e;
        border-bottom: 1px solid #00d35859;
      }

      & .iconContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        align-items: center;

        .iconSet {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
      }

    }

    & .attribute-attack {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      background-color: #1c2322;
      overflow-y: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar {
      display: none;
      }
      max-height: 234px;
    }
  `,
  Input: styled.input`
    height: 12px;
    padding: 0.5em;
    border: none;
    border-radius: 3px;
    width: 50%;
    margin: 0.5em 0;
    margin-left: 2px;
    color: white;
    background-color: #2f333a;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.259);
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: white;
    }
  `,
  SelectedIcon: styled.img`
    width: 20%;
    box-shadow: 2px 2px 2px black;
    border: 1px solid #25b146;
  `,
  NotSelected: styled.img`
    width: 15%;
    padding 5 px;
  `,
  CharIcon: styled.button`
  width: 100px;
  height: 30px;
  justify-content: center;
  font-size: 1em;
  color: black;
  background-color: #215a4f;
  color: white;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition-duration: 0.1s;
  &:hover {
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.262);
  background: #23bb9c;
  color: white;
  };
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
    };
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
    margin-top: 5px;

    & .icon {
      margin: 0px 2px;
      cursor: pointer;
    }
  `,
  AttackBox: styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  `,
};

export default CSS;
