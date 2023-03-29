import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { userSignUp, churchAcc } from "../api/user.api";
import { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select';
import TextAreaComp from "../components/TextAreaComp";

import "../styles.css";


const DashboardPage = () => {
  const navigate = useNavigate();

  const [isRequest, setIsRequest] = useState(false);
  const options = [
    { label: "Baptist", value: "Baptist" },
    { label: "Souther Baptist", value: "SBapist" },
    { label: "Non-Denominational", value: "NDenominational" },
    { label: "Pentecostal", value: "Pentecostal" },
    { label: "Lutheran", value: "Lutheran" },
    { label: "Seventh Day Adventist", value: "sventh" },
    { label: "Methodist", value: "Methodist" }
  ];

  const options_1 = [
    { label: "Reformed", value: "Reformed" },
    { label: "Paedobaptist", value: "Paedobaptist" },
    { label: "Credobaptist", value: "Credobaptist" },
    { label: "Egalitarian", value: "Egalitarian" },
    { label: "Charismatic", value: "Charismatic" },
    { label: "Missional", value: "Missional" },
    { label: "Methodist", value: "Methodist" }
  ];

  const options_2 = [
    { label: "Charles Spurgeon", value: "Charles" },
    { label: "John Wesley", value: "John" },
    { label: "Douglas Wilson", value: "Douglas" },
    { label: "Jen Wilkin", value: "Jen" },
    { label: "Matt Chandler", value: "Matt" },
    { label: "Tony Evans", value: "Tony" },
    { label: "Craig Groeschel", value: "Craig" },
    { label: "Kevin Deyoung", value: "Kevin" },
    { label: "Steven Furtick", value: "Steven" },
  ];

  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([]);
  const [selected2, setSelected2] = useState([]);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: yup.object({
      username: yup.string()
        .required("username is required").min(6).max(15),
      password: yup.string()
        .required("password is requried").min(8),
      confirmPassword: yup.string()
        .required("Confirm password is requried").min(8).oneOf([yup.ref("password")], "Confirm password not match")
    }),
    onSubmit: (values) => onSignUp(values)
  });

  const onSignUp = async ({ username, password }) => {
    const { response, err } = await userSignUp({ username, password });
    if (response) {
      const reresponse = churchAcc({ selected, selected1, selected2 });
      toast.success("Signup success");
      navigate("/signin");
    }
    if (err) toast.error(err.message);
  };

  const [text, setText] = useState('');

  const handleTextChange = event => {
    setText(event.target.value);
    console.log("this is the text:", text);
  }

  const onChangePrompt = event => {
    localStorage.setItem("basePrompt", text);
    navigate("/");
  }

  return (
    <Box component="form" noValidate onSubmit={form.handleSubmit} sx={{ "margin": "50px 100px" }}>
      <Stack spacing={2}>
        <h1>Prompt Sentence</h1>
        <TextAreaComp defaultValue={localStorage.getItem("basePrompt")} textValue={text} onTextAreaChange={handleTextChange} />
        <h1>Modify Screening Questions</h1>
        <Select options={options} value={selected} onChange={setSelected} labelledBy={"Select"} isCreatable={true} style={{ color: "red" }} /> &nbsp;
        <h2>Please choose one that express you. (Multiple choices)</h2>
        <MultiSelect options={options_1} value={selected1} onChange={setSelected1} labelledBy={"Select"} isCreatable={true} />
        <h2>Please choose one that express you. (Multiple choices)</h2>
        <MultiSelect options={options_2} value={selected2} onChange={setSelected2} labelledBy={"Select"} isCreatable={true} color="success" />
        <LoadingButton type="submit" size="large" variant="contained" loading={isRequest} onClick={onChangePrompt} color="success" > Change </LoadingButton>
      </Stack>
    </Box>

  );
};

export default DashboardPage;