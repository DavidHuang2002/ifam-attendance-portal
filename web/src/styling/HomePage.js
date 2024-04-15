import React from 'react';
import styled from 'styled-components';

// Styled Components
export const Wrapper = styled.div`
  width: 100%;
`;

// Hero Section
export const HeroImgSection = styled.section`
  position: relative;
  height: 800px;
  overflow: hidden;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const HeroHeading = styled.h1`
  position: absolute;
  top:30%;
  left: 55%;
  transform: translate(-50%, -50%);
  font-size: 4.5rem;
  color: #2C5C9B;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0);
`;

export const HeroText = styled.p`
  position: absolute;
  top: 65%;
  left: 55%;
  font-size: 1.5rem;
  color: #2C5C9B;
`;

export const HeroButton = styled.a`
  position: absolute;
  top: 62%;
  left: 48%;
  background-color: #2C5C9B; /* Blue background */
  color: white; /* White text */
  padding: 20px 20px; /* Adjust padding as needed */
  border: none;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none; /* Remove default underline */


  /* Hover effect */
  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

// Who We Are Intro Section
export const WhoWeAreSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: white;
`;

export const WhoWeAreHeading = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.8rem;
  color: black;
`;

export const WhoWeAreText = styled.p`
  font-size: 1.2rem;
  padding: 0 18rem;
  line-height: 2;
`;

export const WhoWeAreDivider = styled.p`
  font-size: 2rem;
  padding: 0;
  line-height: 1;
  color: #DDA722;
`;

// Popular Events Section
export const PopularEventsSection = styled.section`
 display: flex;
 padding: 4rem 6rem;
 font-family: 'Quicksand', sans-serif;
 background: white;
`;

export const PopularEventsText = styled.div`
 flex: 1;
 text-align: center;
`;

export const PopularEventsHeading = styled.h2`
 font-weight: bold;
 margin-bottom: 1.5rem;
 font-size: 2rem;
 color: black;
`;

export const PopularEventsDivider = styled.p`
 font-size: 2rem;
 text-align: center;
 color: #DDA722;
`;

export const PopularEventsList = styled.ul`
 list-style-type: none;
 padding: 30px;
 text-align: center;
 max-width: 400px;
 margin: 0 auto;
 line-height: 2;
 font-size: 1.2rem;
 width: 50%

 li {
   margin-bottom: 1rem;
 }
`;

export const PopularEventsButton = styled.a`
  background-color: #DDA722; /* Gold background */
  color: white; /* White text */
  padding: 20px 20px; /* Adjust padding as needed */
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none; /* Remove default underline */
  font-family: 'Quicksand', sans-serif;


  /* Hover effect */
  &:hover {
    background-color: white; /* Darker blue on hover */
  }
`;
/*
export const FixedHeroSection = styled(HeroSection)`
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
*/

export const PopularEventsImageWrapper = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
`;

export const PopularEventsImage = styled.img`
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ContactUsSection = styled.section`
  background: #2C5C9B;
  height: 400px;
  position: relative;
  justify-content: center;

`;

export const ContactUsHeading = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.8rem;
  color: white;
  padding: 3rem;
  text-lign: center;
`;

export const ContactUsText = styled.p`
  font-size: 1.2rem;
  padding: 0;
  line-height: 2;
  margin-bottom: 3rem;
  text-align: center;
  color: white;
`;

export const ContactUsButton = styled.a`
  background-color: #DDA722; /* Blue background */
  color: white; /* White text */
  padding: 20px 20px; /* Adjust padding as needed */
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none; /* Remove default underline */
  font-family: 'Quicksand', sans-serif;
  position: absolute;
  top: 62%;
  left: 44%;
  

  /* Hover effect */
  &:hover {
    background-color: white; /* Darker blue on hover */
  }
`;

export const FooterSection = styled.footer`
  background-color: #f2f2f2; /* Grey background */
  padding: 20px; /* Adjust padding as needed */
  display: flex;
  align-items: center;
  font-family: 'Quicksand', sans-serif;
  height: 200px; 
`;

export const FooterText = styled.div`
  flex: 1;
  text-align: left; 
`;
