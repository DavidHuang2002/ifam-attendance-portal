import React from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import 'typeface-quicksand';

import HeroSection from '@/components/mainPage/HeroSection';

/*import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
`;
*/

// Styled Components
const Wrapper = styled.div`
  width: 100%;
`;

// Nav Bar Section
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2C5C9B;
  color: #FFFFFF;
  padding: 1rem;
  font-family: 'Quicksand', sans-serif;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-right: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ccc;
    }
  }
`;

const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 1rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  li {
    margin-right: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ccc;
    }
`;

// Hero Section
const HeroImgSection = styled.section`
  position relative;
  height: 550px;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroHeading = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

// Who We Are Intro Section
const WhoWeAreSection = styled.section`
  padding: 12rem 2rem;
  text-align: center;
  font-family: 'Quicksand', sans-serif;

`;

const WhoWeAreHeading = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.8rem;
`;

const WhoWeAreText = styled.p`
  font-size: 1.2rem;
  padding: 0 18rem;
  line-height: 2;
`;

// Popular Events Section
const PopularEventsSection = styled.section`
 display: flex;
 padding: 4rem 2rem;
 font-family: 'Quicksand', sans-serif;
`;

const PopularEventsText = styled.div`
 flex: 1;
 text-align: center;
`;

const PopularEventsHeading = styled.h2`
 font-weight: bold;
 margin-bottom: 1.5rem;
 font-size: 2rem;
`;

const PopularEventsDivider = styled.p`
 margin-bottom: 1.5rem;
 font-size: 1.5rem;
 text-align: center;
`;

const PopularEventsList = styled.ul`
 list-style-type: none;
 padding: 0;
 text-align: center;
 max-width: 400px;
 margin: 0 auto;
 line-height: 2;
 margin-top: 1.5rem;
 font-size: 1.2rem;

 li {
   margin-bottom: 1rem;
 }
`;
/*
const PopularEventsImage = styled(HeroSection)`
 flex: 1;
`;
*/
const PopularEventsImage = styled.img`
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FooterSection = styled.footer`
  background-color: #f2f2f2; /* Grey background */
  padding: 20px; /* Adjust padding as needed */
  display: flex;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  height: 200px; 
`;

const FooterText = styled.div`
  flex: 1;
  text-align: left; 
`;



const LandingPage = () => {
  return (
    <Wrapper>
      <Navbar>
        <NavLeft>
          <NavLinks>
            <li>About Us</li>
            <li>Events</li>
            <li>Contact Us</li>
          </NavLinks>
        </NavLeft>
        <NavRight>
          <NavLinks>
            <li>Admin Login</li>
          </NavLinks>
        </NavRight>
      </Navbar>

      <HeroImgSection>
        <HeroImage src="/I-FAM.jpg" alt="Hero Image" />
        <HeroHeading>I-FAM</HeroHeading>
      </HeroImgSection>

      <WhoWeAreSection>
        <WhoWeAreHeading>Who We Are</WhoWeAreHeading>
        <WhoWeAreText> ------------------------------------ </WhoWeAreText>
        <WhoWeAreText>I-FAM is a non-profit Christian student group that serves international students 
          from all backgrounds and faiths at Vanderbilt University and other Nashville area universities. 
          We are a community for international students to connect, explore, lead & grow together. We do 
          this by welcoming international students and creating a community for students to connect with 
          one another on campus and in the community; explore the campus, city and take fun trips; learn 
          to lead & help each other to grow emotionally, socially, and spiritually through a Christian 
          perspective.</WhoWeAreText>
      </WhoWeAreSection>

      <PopularEventsSection>
       <PopularEventsText>
         <PopularEventsHeading>Our Popular Events</PopularEventsHeading>
         <PopularEventsDivider> -------------------------- </ PopularEventsDivider>
         <PopularEventsList>
           <li>Biweekly Dinner and Discussions</li>
           <li>Fun Nashville Activities</li>
           <li>Grocery Store Runs</li>
           <li>Airport Pickups</li>
         </PopularEventsList>
       </PopularEventsText>
       <PopularEventsImage src="/I-FAM.jpg" alt="Hero Image" />
     </PopularEventsSection>

    <FooterSection>
      <FooterText>
        Contact Us: 
      </FooterText>
    </FooterSection>
    </Wrapper>
  );
};

export default LandingPage;