import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import {
  createStyles,
  Card,
  Image,
  Text,
  Group,
  Button,
  Rating,
} from "@mantine/core";
import {
  IconBed,
  IconMapPinExclamation,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import "../styles/Hotels.css";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    boxShadow: theme.shadows.md,
    margin: "60px",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  title: {
    fontWeight: 800,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 0.2,
    fontSize: 25,
  },
  body: {
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  subTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
    justifyContent: "flex-start",
    fontSize: 12,
  },
  icon: {
    marginRight: theme.spacing.xs,
  },

  rating: {
    marginTop: theme.spacing.xs,
  },
}));

function Hotels() {
  const { name } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/finda/${name}`
  );
  console.log(data);

  const { classes } = useStyles();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) {
      return 0;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating.toFixed(1);
  };

  return (
    <div className="body">
      <h1 className="hots">Hotels in {name}</h1>
      <div>
        {data.map((hotel) => (
          <Card
            withBorder
            radius="md"
            p={0}
            className={classes.card}
            key={hotel._id}
          >
            <Group noWrap spacing={0}>
              <Image
                src={`https://${hotel.photos[0]}`}
                height={350}
                width={400}
              />
              <div className={classes.body}>
                <div>
                  <Text className={classes.title} mb="md">
                    {hotel.name}
                  </Text>
                  <Text className={classes.subTitle} mt="xs" mb="md">
                    {hotel.description}
                  </Text>
                  <div className={classes.subTitle}>
                    <IconBed className={classes.icon} size={16} />
                    <Text size="xs" color="dimmed">
                      {hotel.location}
                    </Text>
                  </div>
                  <div className={classes.subTitle}>
                    <IconMapPinExclamation className={classes.icon} size={16} />
                    <Text size="xs" color="dimmed">
                      {hotel.distance}
                    </Text>
                  </div>
                  <div className={classes.subTitle}>
                    <IconCurrencyDollar className={classes.icon} size={16} />
                    <Text size="xs" color="dimmed">
                      {hotel.cheapestPrice}
                    </Text>
                  </div>
                  <div className={classes.subTitle}>
                    Rating:{" "}
                    <Rating
                      value={calculateAverageRating(hotel.rating)}
                      max={5}
                      size="md"
                    />
                  </div>
                </div>
                <Button
                  className={classes.button}
                  component={Link}
                  to={`/hotel/${hotel._id}`}
                  variant="outline"
                >
                  Visit Hotel
                </Button>
              </div>
            </Group>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
