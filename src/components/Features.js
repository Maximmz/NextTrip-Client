import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from '@mantine/core';
import { IconCompass, IconPlane, IconMap } from '@tabler/icons-react';

const mockdata = [
  {
    title: 'Explore Exciting Destinations',
    description:
      'Discover the breathtaking beauty of Pakistan with our curated travel packages. From lush valleys to majestic mountains, there is something for everyone.',
    icon: IconCompass,
  },
  {
    title: 'Unforgettable Travel Experiences',
    description:
      'Create memories that last a lifetime. Our expert guides and well-planned itineraries ensure that you have an immersive and unforgettable travel experience.',
    icon: IconPlane,
  },
  {
    title: 'Discover Hidden Gems',
    description:
      'Get off the beaten path and explore the hidden gems of Pakistan. Our local insights and off-the-grid destinations will provide you with a unique and authentic travel experience.',
    icon: IconMap,
  },
];

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.colors.primary,
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.colors.primary,
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon size={rem(50)} stroke={2} color={theme.colors.primary} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" mt="lg">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Best travel company in Pakistan
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Discover the Beauty of Pakistan
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Pakistan is a land of wonders waiting to be explored. From the vibrant culture to the stunning landscapes, NextTrip offers you the opportunity to travel across Pakistan and experience its true essence.
      </Text>

      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
