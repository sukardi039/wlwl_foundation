import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [signedinuser, setSignedinuser] = useState({
    instructor: 0,
    // Add other user properties as needed
  });

  const [paramdata, setParamdata] = useState({
    params_ref: { params: { fileURL: '' } },
    staff_det: { staff: {} },
    action_det: { action: [], subAction: {} },
    action_lst: { subAction: {} },
    action_ref: { action: {} },
    action_exp: { action: {} },
    base_ref: { actions: {} },
    style_det: { style: [] },
    style_des: { style: {} },
    task_ref: { task: {} },
    task_det: { task: {} },
    task_eff: {},
    product_ref: { product: {} },
    // Add other paramdata properties as needed
  });

  const value = {
    signedinuser,
    setSignedinuser,
    paramdata,
    setParamdata,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
