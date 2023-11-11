import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: currentUser,
    user: {}
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const selectedUser = action.payload;
        const chatId =
          currentUser.uid > selectedUser.uid
            ? currentUser.uid + selectedUser.uid
            : selectedUser.uid + currentUser.uid;

        console.log("Chat ID:", chatId); // Agregar este mensaje de depuración

        return {
          user: selectedUser,
          chatId: chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  console.log("ChatContext State:", state); // Agregar este mensaje de depuración

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
