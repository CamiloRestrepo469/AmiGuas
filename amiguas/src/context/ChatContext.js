import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext"; // Asegúrate de que esta importación esté completa

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {}
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const selectedUser = action.payload; // Cambiado de "user" a "selectedUser"
        const chatId =
          currentUser.uid > selectedUser.userId
            ? currentUser.uid + selectedUser.userId
            : selectedUser.userId + currentUser.uid;

        return {
          user: selectedUser, // Cambiado de "action.payload" a "selectedUser"
          chatId: chatId,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
