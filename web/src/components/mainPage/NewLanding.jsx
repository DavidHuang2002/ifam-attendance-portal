import React from 'react';
import {useState} from 'react';
import 'typeface-quicksand';

import Image from 'next/image';
import HeroSection from '@/components/mainPage/HeroSection';
import {GlobalStyle} from '@/styling/GlobalFonts';

import { Wrapper, HeroImgSection, HeroHeading, HeroButton, HeroText,
         WhoWeAreSection, WhoWeAreDivider, WhoWeAreHeading, WhoWeAreText,
         PopularEventsSection, PopularEventsDivider, PopularEventsButton, PopularEventsImage, PopularEventsImageWrapper, PopularEventsText, PopularEventsHeading, PopularEventsList,
         ContactUsSection, ContactUsHeading, ContactUsText, ContactUsButton} from '@/styling/HomePage';



export default function LandingPage() {
  return (
    <Wrapper>
      <GlobalStyle />
      <HeroImgSection>
        <Image
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          src="/hero-section/I-FAM.png"
          alt="Hero Image"
        />
        {/* <HeroImage src="/hero-section/I-FAM.png" alt="Hero Image" /> */}
        <HeroHeading>I-FAM</HeroHeading>
        <HeroButton href="/events">Our Upcoming Events &rarr;</HeroButton>
      </HeroImgSection>

      <WhoWeAreSection>
        <WhoWeAreHeading>Who We Are</WhoWeAreHeading>
        <WhoWeAreDivider> ---------------------------------- </WhoWeAreDivider>
        <WhoWeAreText>
          I-FAM is a non-profit Christian student group that serves
          international students from all backgrounds and faiths at Vanderbilt
          University and other Nashville area universities. We are a community
          for international students to connect, explore, lead & grow together.
          We do this by welcoming international students and creating a
          community for students to connect with one another on campus and in
          the community; explore the campus, city and take fun trips; learn to
          lead & help each other to grow emotionally, socially, and spiritually
          through a Christian perspective.
        </WhoWeAreText>
      </WhoWeAreSection>

      <PopularEventsSection>
        <PopularEventsText>
          <PopularEventsHeading>Our Popular Events</PopularEventsHeading>
          <PopularEventsDivider>
            {" "}
            --------------------------{" "}
          </PopularEventsDivider>
          <PopularEventsList>
            <li>Biweekly Dinner and Discussions</li>
            <li>Fun Nashville Activities</li>
            <li>Grocery Store Runs</li>
            <li>Airport Pickups</li>
          </PopularEventsList>
          <PopularEventsButton href='/events'> Check Out Our Upcoming Events!</PopularEventsButton>
        </PopularEventsText>
        <PopularEventsImageWrapper>
          <PopularEventsImage src="/hero-section/dinner.jpg" alt="Hero Image" />
        </PopularEventsImageWrapper>
      </PopularEventsSection>

      <ContactUsSection>
        <ContactUsHeading>Connect With Us</ContactUsHeading>
        <ContactUsText>We'd love to connect with you and get to know you. Join us for a fun trip or a lovely dinner and discussions!</ContactUsText>
        <ContactUsButton href='/contact'>Send Us a Message!</ContactUsButton>
      </ContactUsSection>
    </Wrapper>
  );
}