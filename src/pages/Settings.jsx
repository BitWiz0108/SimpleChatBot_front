import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  FormControl,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { Table } from "antd";
import Header from "../components/Header";
import { getAllAccounts } from "../api/user.api";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import "../styles.css";

const Settings = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getAllAccountData = async () => {
      const { response, err } = await getAllAccounts();
      const usersData = response.map((user, index) => {
        return {
          ...user,
          key: index + 1,
        };
      });
      setTableData(usersData);
      console.log("This is the entier user data:", usersData);
    };
    getAllAccountData();
  }, []);

  const onSignOut = () => {
    localStorage.removeItem("tkn");
    navigate("/signin");
  };

  const onGoDashboard = () => {
    navigate("/dashboard");
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log("this is the text:", text);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      defaultSortOrder: "descend",
    },
    {
      title: "Name",
      dataIndex: "username",
      defaultSortOrder: "descend",
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
    },
    {
      title: "who am I",
      dataIndex: "job",
      defaultSortOrder: "descend",
    },
    {
      title: "Distinctive",
      dataIndex: "distintive",
      defaultSortOrder: "descend",
    },
    {
      title: "favorite writers",
      dataIndex: "writer",
      defaultSortOrder: "descend",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Stack spacing={2}>
      <Header bg borderBottom>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            paddingX: 2,
            maxWidth: "md",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* {username} */}
            SettingsPage
          </Typography>
          <IconButton
            onClick={onSignOut}
            sx={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
            }}
          >
            <LogoutOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={onGoDashboard}
            sx={{
              position: "absolute",
              top: "50%",
              right: "50px",
              transform: "translateY(-50%)",
            }}
          >
            Dashboard
          </IconButton>
        </Box>
      </Header>

      <Box>
        <div style={{ margin: "50px 100px" }}>
          <h1>Signed Church Accounts</h1>
          <Table columns={columns} dataSource={tableData} onChange={onChange} />
        </div>
      </Box>
    </Stack>
  );
};
export default Settings;
