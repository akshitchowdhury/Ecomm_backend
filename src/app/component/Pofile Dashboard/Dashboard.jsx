import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
// import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
// import RememberMeIcon from "@mui/icons-material/RememberMe";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {
  Code,
  Collections,
  Contacts,
  Person,
  AccountCircle,
} from "@mui/icons-material";  
;
// import About from "../About/About";
// import Home from "../Home/Home";
// import pic from "../../assets/i1.jpg";
// import "./Navbar.css";

function Dashboard({userImg, userName}) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "black",
        padding: 4,
        height: 700,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div
        style={{
          color: "white",
          fontSize: 40,
          backgroundImage: `url(${userImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          width: 60,
          height: 60,
        }}
        className="mx-6 my-10"
      >
        {" "}
        <h1 className=" mx-20 text-lg text-white"> {userName}</h1>
      </div>
      <List>
        {/* <Link to="/">  */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primary={"Home"}
                className="text-white hover:text-amber-300 
                transition ease-in-out duration-300
                hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

        {/* <Link to="/about"> */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <Person style={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primary={"About"}
                className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

        {/* <Link to="/services"> */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <Code style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Services"}
                className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}
        

        {/* <Link to="/products"> */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <Code style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Products Services"}
                className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {[
          {
            contact: "Contact",
            link: "/contact",
            text: "Contact",
            icon: <Contacts />,
          },
        ].map((item, index) => (
          <ListItem style={{ marginLeft: "9%" }} key={index} disablePadding>
            {/* <Link to={item.link}> */}
              <ListItemButton
              >
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
                  primary={item.text}
                />
              </ListItemButton>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="absolute top-0 left-0 z-50 p-4">
  <Button onClick={toggleDrawer(true)}>
    <MenuOpenIcon className="text-white "
    style={{
      fontSize: '40px'
    }} />
  </Button>
  <Drawer open={open} onClose={toggleDrawer(false)}>
    {DrawerList}
  </Drawer>
</div>

  );
}

export default Dashboard;
