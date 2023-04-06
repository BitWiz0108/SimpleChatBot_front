import Header from "../components/Header";
import { useState, useEffect } from "react";
import { Stack, Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "../styles.css";

const PromptChange = () => {
    const navigate = useNavigate();
    const changePrompt = () => {
        localStorage.setItem("base_prompt", text);
        navigate("/");
    }
    const [text, setText] = useState("");
    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        setText(localStorage.getItem("base_prompt"));
    }, []);

    return (
        <Stack alignItems="center" justifyContent="space-between" sx={{ padding: "10rem, 15rem", fontFamily: "IBM_Plex_Mono", height: "100%", backgroundColor: "#F8D546" }} >
            <Header x={{ width: "75%" }}>
                <img src="../assets/logo1.jpg" className="logoimage" style={{ zIndex: 0 }}></img>
            </Header>
            <Box className="mybody" sx={{ display: "flex", flexDirection: "column", gap: "30px", justifyContent: "center", alignItems: "center", height: "100%", position: "fixed", zIndex: 1, width: "75%", maxWidth: "1000px", paddingBottom: "200px" }}>
                <TextField id="outlined-textarea"
                    value={text}
                    onChange={handleTextChange}
                    label="Your customized prompt here..."
                    placeholder="Your customized prompt here..."
                    multiline rows="10"
                    sx={{ width: "75%" }} />
                <Button variant="outlined" onClick={changePrompt}>Change Prompt</Button>
            </Box>
            <Stack paddingBottom={0} width="100%" bgcolor="#F8D546" maxWidth="1000px" sx={{ width: "75%" }} zIndex={3} alignItems="center">
                <Box sx={{ backgroundColor: "#F8D546", width: "100%", paddingBottom: "0" }}>
                    <a href="https://vinestrat.com" style={{ height: "100%" }}>
                        <img src="../assets/footer.jpg" style={{ width: "100%" }} href="#"></img>
                    </a>
                </Box>
            </Stack>
        </Stack>
    );
};

export default PromptChange;