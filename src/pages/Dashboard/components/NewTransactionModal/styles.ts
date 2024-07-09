import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import imagemFundo from "../../../../assets/img-fundo.jpg";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: url(${imagemFundo}) center center no-repeat fixed;
  background-size: cover;
`;

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 1.5rem;
  z-index: 100;
`;

export const Content = styled(Dialog.Content)`
  position: fixed;
  width: 570px;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  background-color: black;
  border-radius: 20px;
`;

export const Wrapper = styled.div`
  background: #ffdb24;
  border-radius: 8px;
  margin: 28px 0 22px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled(Dialog.DialogClose)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 2.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
`;

export const Title = styled(Dialog.Title)`
  margin: 1rem 0 0.75rem 0;
  padding-bottom: 0.5rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const RecipeFormContainer = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-right: 0.18rem;
  width: 550px;

  form {
    width: 380px;
    display: flex;
    flex-direction: column;
  }

  img {
    margin-bottom: 75px;
  }
`;

export const Infos = styled.div`
  align-items: center;
  margin-bottom: 0.35rem;
  display: flex;
  flex-direction: column;
`;

export const ContentRecipe = styled.div`
  display: flex;
  width: 100%;

  #nameRecipe {
    height: 30px;
  }

  p {
    margin: auto;
    padding-right: 0.3rem;
    font-weight: bold;
  }

  textarea {
    height: 67px;
    width: 240px;
    resize: none;
    padding: 0.35rem 0.5rem;
    border: 0;
    border-radius: 0.32rem;
    font-size: 0.9rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    box-shadow: 2px 2px 0 0 rgba(128, 128, 128, 0.5);
  }
`;

export const ErroMessage = styled.div`
  display: flex;

  span {
    font-size: 12px;
    font-weight: bold;
    color: #d92525;
    width: 160px;
    margin: 2px 0 8px 65px;
  }
`;

export const Restrictions = styled.div`
  display: flex;
  flex-direction: space-between;
  width: 100%;
  gap: 5px;
  align-items: center;
  justify-content: space-between;

  p {
    margin: auto;
    padding-right: 0.3rem;
    font-weight: bold;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const ButtonDiv = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-left: 130px;
  justify-content: center;
  gap: 10px;
`;

export const BaseButton = styled.button`
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  width: 50%;
  margin-bottom: 0.5rem;
`;

export const ButtonNewRecipe = styled(BaseButton)`
  &:hover {
    background-color: #dedede;
    transition: 0.2s;
  }
`;

export const ButtonDelete = styled(BaseButton)`
  &:hover {
    background-color: #f75f00;
    transition: 0.2s;
  }
`;
