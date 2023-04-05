import Header from "../components/Header";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { chatCompletion } from "../api/chat.api";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Stack, Box, FormControl, OutlinedInput, CircularProgress, Button } from "@mui/material";
import TypewriterComp from "../components/TypeWriterComp";
import "../styles.css";

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
    <Stack alignItems="center" justifyContent="space-between" sx={{ padding:"10rem, 15rem", fontFamily: "IBM_Plex_Mono", height:"100%", backgroundColor: "#F8D546" }} >
      <Header x={{width:"75%"}}>
        <img src="../assets/logo1.jpg" className="logoimage" style={{zIndex:0}}></img>
      </Header>
      <Box ref={chatWrapperRef} className="mybody" sx={{ height: "100%", position: "fixed", overflowY: "auto", zIndex: 1, width: "75%", maxWidth: "1000px", paddingBottom: "200px", "&::-webkit-scrollbar": { width: "0px" } }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%" }}>
          {messages.map((item, index) => (
            <Box key={index} padding={1}>
              <Box className="balloon" sx={{ width: "80%", bgcolor: item.type === messageType.answer ? "#FA794A" : "#F8EAAF", color: item.type === messageType.answer ? "White" : "#303030", ml: item.type === messageType.answer ? "20%" : "0%", borderRadius: 3 }}>
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
      <Stack paddingBottom={0} width="100%" bgcolor="#F8D546" maxWidth="1000px" sx={{width:"75%"}} zIndex={3} alignItems="center">
        <div style={{width:"100%", height:"10px", backgroundColor:"#F8D546"}}></div>
        <Box width="100%" maxWidth="1000px" bgcolor="#F8D546" border = "solid 1px gray">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput inputRef={inputRef} sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }} endAdornment={onRequest ? (<CircularProgress size="1.5rem" />) : (<SendOutlinedIcon />)}
              autoFocus disabled={onRequest} onKeyUp={onEnterPress} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Send a message..." />
          </FormControl>
        </Box>
        <Box sx={{backgroundColor:"#F8D546", width:"100%", paddingBottom:"0"}}>
          <Box className="bottomButtons" sx={{ justifyContent:"center", backgroundColor:"#F8D546", alignItems:"center", marginBottom: "10px", gap: "auto", display: "flex" }}>
            <Button variant="outlined" >Sponsor</Button>
            <Button variant="outlined" >Donate</Button>
          </Box>
          <a href="https://vinestrat.com" style={{height:"100%"}}>  
            <img src="../assets/footer.jpg" style={{width:"100%"}} href="#"></img>
          </a>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HomePage;