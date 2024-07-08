import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import image from "../../../img/template1/portfolio1.png";

const Card1 = () => {
  return (
    <div>
      <Card className="md:w-72 w-full md:mx-4 mb-10">
        <CardMedia
          component="img"
          alt="template-1"
          height="140"
          image={image}
        />
        <CardContent>
          <div
            style={{ fontFamily: "Dancing Script" }}
            className="text-xl md:text-2xl"
            gutterBottom
            variant="h5"
            component="div"
          >
            Template-1: NeoMorphism Styled Template
          </div>
          <div
            style={{ fontFamily: "Edu NSW ACT Foundation" }}
            variant="body2"
            color="text.secondary"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
            consectetur.
          </div>
        </CardContent>
        <CardActions>
          <div
            style={{ fontFamily: "Dancing Script" }}
            className="w-full duration-500 text-xl rounded-xl cursor-pointer hover:bg-black/100 bg-black/80 text-center p-2 text-white"
          >
            Use This Template
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Card1;
