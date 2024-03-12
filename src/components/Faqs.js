import React from 'react';
import { createStyles, Image, Accordion, Grid, Col, Container, Title } from '@mantine/core';
import image from '../assets/faq.png';

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 5)`,
    paddingBottom: `calc(${theme.spacing.xl} * 5)`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.blue[0],
    marginTop:"70px",
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[8],
  },
}));

export function FaqWithImage() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Image src={image} alt="Frequently Asked Questions" />
          </Col>
          <Col span={12} md={6}>
            <Title order={2} ta="left" className={classes.title}>
              Frequently Asked Questions
            </Title>

            <Accordion chevronPosition="right" defaultValue="booking" variant="separated">
              <Accordion.Item className={classes.item} value="booking">
                <Accordion.Control>How do I make a booking?</Accordion.Control>
                <Accordion.Panel>
                  To make a booking, please follow these steps:
                  <ol>
                    <li>Visit our website and browse the available travel packages.</li>
                    <li>Select the package that interests you.</li>
                    <li>Click on the "Book Now" button.</li>
                    <li>Provide the required information, including your travel dates and personal details.</li>
                    <li>Review your booking details and proceed to the payment page.</li>
                    <li>Select your preferred payment method and complete the payment.</li>
                    <li>Once the booking is confirmed, you will receive a confirmation email with your booking details.</li>
                  </ol>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="cancellation">
                <Accordion.Control>What is your cancellation policy?</Accordion.Control>
                <Accordion.Panel>
                  Our cancellation policy allows for flexibility in case your plans change. Here are the key points:
                  <ul>
                    <li>Cancellations made at least 48 hours prior to the travel date are eligible for a full refund.</li>
                    <li>Cancellations made within 48 hours of the travel date may be subject to cancellation fees.</li>
                    <li>Please refer to our terms and conditions for specific details regarding cancellations and refunds.</li>
                    <li>If you need to cancel your booking, please contact our customer support team for assistance.</li>
                  </ul>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="payment">
                <Accordion.Control>What payment methods do you accept?</Accordion.Control>
                <Accordion.Panel>
                  We accept the following payment methods for bookings:
                  <ul>
                    <li>Credit cards (Visa, Mastercard, American Express)</li>
                    <li>Debit cards</li>
                    <li>PayPal</li>
                    <li>Bank transfers</li>
                  </ul>
                  If you have any specific payment-related inquiries or require assistance, please contact our customer support.
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="destinations">
                <Accordion.Control>What destinations do you offer?</Accordion.Control>
                <Accordion.Panel>
                  We offer a wide range of travel destinations worldwide. Some of our popular destinations include:
                  <ul>
                    <li>Tropical beach destinations</li>
                    <li>Historical and cultural cities</li>
                    <li>Natural wonders and national parks</li>
                    <li>Adventure and outdoor destinations</li>
                  </ul>
                  Visit our website to explore the full list of destinations and find your dream vacation spot.
                </Accordion.Panel>
              </Accordion.Item>

              {/* Add more accordion items as needed */}

            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
