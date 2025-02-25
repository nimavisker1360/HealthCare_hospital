import React from "react";
import { ConfigProvider } from "antd";
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#16423c",
          borderRadius: 2,
          controlOutline:"none"
        },
        components: {
          Button: {
            controlHeight: 45,
            defaultBorderColor:'#16423c'
          },
          Select:{
            controlHeight:45
          },
          Input:{
            controlHeight:45
          }
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
