import { createContext, useContext, useState } from 'react';

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    // Type can be either "success" or "error"
    type: 'success',
    // Message to be displayed, can be any string
    message: '',
  });

  const alertCtx = {
    ...state,
    onOpen: (type, message) => setState({ isOpen: true, type, message }),
    onClose: () => setState({ isOpen: false, type: '', message: '' }),
  };

  return <AlertContext.Provider value={alertCtx}>{children}</AlertContext.Provider>;
};

export const useAlertContext = () => useContext(AlertContext);
