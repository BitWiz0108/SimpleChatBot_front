import { Box } from "@mui/material";

const Header = (props) => {
  return (
    <Box className="myheader" sx={{
      zIndex: 2,
      width: "75%",
      maxWidth: "1000px",
      bgcolor: "#F8D546",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {props.children}
    </Box>
  );
};

export default Header;