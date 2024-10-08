import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ result }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 20 }}>
          最短路径:
        </Typography>
        <Typography variant="h5" component="div">
          {result.shortest_path.join(" -> ")}
          <br />
          <br />
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5, fontSize: 20 }}>
          路径长度（百米）:
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 20 }}>
          {result.path_length}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          href={`http://127.0.0.1:5000/${result.map_url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>查看路径地图</h2>
        </Button>
      </CardActions>
    </Card>
  );
}
