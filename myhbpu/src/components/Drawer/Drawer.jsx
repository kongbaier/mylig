import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NavigationOutlinedIcon from "@mui/icons-material/NavigationOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const links = ["/", "/map"];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["地图", "导航"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={links[index]}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <HomeOutlinedIcon />
                ) : (
                  <NavigationOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["注意"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ErrorOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
