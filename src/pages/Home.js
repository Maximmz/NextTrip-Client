import React from "react";
import { Link } from "react-router-dom";
import DemoVideo from "../assets/Landing.mp4";

import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  createStyles,
  rem,
} from "@mantine/core";
import { FeaturesCards } from "../components/Features";
import { FaqWithImage } from "../components/Faqs";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(180),
    paddingBottom: rem(150),
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",

    [theme.fn.smallerThan("xs")]: {
      paddingTop: rem(80),
      paddingBottom: rem(50),
    },
  },

  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  
  
  inner: {
    position: "relative",
    zIndex: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: rem(50),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: "#26A699",
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      fontSize: theme.fontSizes.md,
      textAlign: "left",
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    color: theme.white,
    backgroundColor: "rgba(211, 211, 211, 0.2)", // Light grey color

    transition: "background-color 0.3s ease", // Add transition effect

    "&:hover": {
      backgroundColor: "#18453B", // Green color
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className={classes.wrapper}>
        <video className={classes.video} autoPlay muted loop>
          <source src={DemoVideo} type="video/mp4" />
        </video>

        <Overlay color="#000" opacity={0.45} zIndex={1} />

        <div className={classes.inner}>
        <Title className={classes.title}>
          NextTrip - Travel Across{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{
              from: "#6EE7B7",
              to: "#00B964",
              angle: 45,
              stops: [0, 0.5, 1],
            }}
            inherit
          >
            Pakistan
          </Text>{" "}
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Enjoy your life by using our amazing travel and tours services with
            the most affordable rates.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link to="/destinations">
            <Button className={classes.control} variant="white" size="lg">
              Destinations
            </Button>
          </Link>
        </div>
      </div>
    </div>
    <FeaturesCards/>
    <FaqWithImage/>
    </div>
    
  );

}
