import Header from "../components/Header";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion } from "../api/chat.api";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Stack, Box, FormControl, OutlinedInput, CircularProgress, Button } from "@mui/material";
import TypewriterComp from "../components/TypeWriterComp";
import Image from 'mui-image';
import { Transfer } from "antd";

const messageType = {
  answer: "answer",
  question: "question"
};

const HomePage = () => {

  const inputRef = useRef();
  const chatWrapperRef = useRef();

  const [onRequest, setOnRequest] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const getAnswer = async () => {
    if (onRequest) return;

    const newMessages = [...messages, {
      type: messageType.question,
      content: question
    }];

    setMessages(newMessages);
    setQuestion("");

    const { response, err } = await chatCompletion({ prompt: question });
    console.log("RT", response.text);
    if (response) {
      setMessages([...newMessages, {
        type: messageType.answer,
        content: response.text
      }]);
    }

    if (err) {
      toast.error(err.message);
      setOnRequest(false);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) getAnswer();
  };

  useEffect(() => {
    setTimeout(() => {
      chatWrapperRef.current.addEventListener("DOMNodeInserted", e => {
        e.currentTarget.scroll({
          top: e.currentTarget.scrollHeight,
          behavior: "smooth"
        });
      });
    }, 200);
  }, []);

  return (
    <Stack alignItems="center" justifyContent="space-between" sx={{ padding: "10rem, 15rem", fontFamily: "IBM Plex Mono", height: "100%", backgroundColor: "#F8D546" }} >
      <Header border="2px solid black" sx={{ bgcolor: "black",maxWidth:"md" }}>
        <img src="../assets/logo1.jpg" height="200px"></img>
      </Header>
      <Box ref={chatWrapperRef}  sx={{ height: "100%", position: "fixed", zIndex: 1, width: "75%", maxWidth:"md", overflowY: "auto", paddingTop: "200px", paddingBottom: "200px", "&::-webkit-scrollbar": { width: "0px" } }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%" }}>
          {messages.map((item, index) => (
            <Box key={index} padding={1}>
              <Box sx={{ width: "80%", padding: 2, bgcolor: item.type === messageType.answer ? "#FA794A" : "#F8EAAF", color: item.type === messageType.answer ? "White" : "#303030", ml: item.type === messageType.answer ? "20%" : "0%", borderRadius: 3 }}>
                {index === messages.length - 1 ? (
                  item.type === messageType.answer ? (
                    <TypewriterComp text={item.content}></TypewriterComp>
                  ) : <TypewriterComp text={item.content}></TypewriterComp>
                ) : (
                  item.content
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Stack padding={2} paddingBottom={0} width="75%" bgcolor="#F8D546" maxWidth="md"  zIndex={3} alignItems="center">
        <Box width="100%" maxWidth="md" border="solid 0.25px #F8B155" >
          <FormControl fullWidth variant="outlined">
            <OutlinedInput inputRef={inputRef} sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }} endAdornment={onRequest ? (<CircularProgress size="1.5rem" />) : (<SendOutlinedIcon />)}
              autoFocus disabled={onRequest} onKeyUp={onEnterPress} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Send a message..." />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <Button variant="outlined" sx={{ marginRight: "30px" }} >Become a sponsor</Button>
          <Button variant="outlined" sx={{ marginLeft: "30px" }}>Donate</Button>
        </Box>
          <a href="https://vinestrat.com">
            <img src="../assets/footer.jpg" style={{ marginLeft: "30px" }} href="#"></img>
          </a>
      </Stack>
    </Stack>
  );
};

export default HomePage;