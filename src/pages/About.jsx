import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutContainer>
      <AboutHeader>
        <AboutTitle>About Tarot Insights</AboutTitle>
        <AboutSubtitle>Our mission is to make the ancient wisdom of Tarot accessible in the modern digital age</AboutSubtitle>
      </AboutHeader>

      <AboutSection>
        <SectionTitle>Our Story</SectionTitle>
        <SectionContent>
          <p>
            Tarot Insights began as a passion project by a small team of developers and Tarot enthusiasts 
            who wanted to create a digital Tarot experience that respects the tradition and depth of Tarot 
            while making it accessible to today's users.
          </p>
          <p>
            We believe that Tarot is a powerful tool for self-reflection, creativity, and personal growth. 
            Whether you view it as a spiritual practice, a psychological tool, or simply a fascinating 
            cultural tradition, our goal is to provide a space where you can explore its wisdom.
          </p>
          <p>
            Our app combines traditional Tarot interpretations with modern design and technology to create 
            an experience that's both authentic and user-friendly.
          </p>
        </SectionContent>
      </AboutSection>

      <AboutSection>
        <SectionTitle>Our Approach to Tarot</SectionTitle>
        <SectionContent>
          <p>
            We view Tarot as a mirror that reflects aspects of the human experience. The cards don't tell 
            you what will happen, but rather invite you to reflect on different energies and possibilities 
            in your life.
          </p>
          <p>
            Our interpretations draw from traditional sources while also incorporating modern psychological 
            perspectives. We strive to make our content inclusive, non-dogmatic, and applicable to people 
            of all backgrounds.
          </p>
          <p>
            We believe that the real magic of Tarot lies in its ability to tap into your own intuition and 
            wisdom, and our app is designed to support that process.
          </p>
        </SectionContent>
      </AboutSection>

      <AboutSection>
        <SectionTitle>Our Team</SectionTitle>
        <TeamGrid>
          <TeamMember>
            <TeamMemberImage src="/images/team/avatar1.jpg" alt="Team Member" />
            <TeamMemberName>Alexandra Rivers</TeamMemberName>
            <TeamMemberRole>Founder & Tarot Expert</TeamMemberRole>
            <TeamMemberBio>
              Alexandra has been studying Tarot for over 15 years and is certified in Tarot counseling.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberImage src="/images/team/avatar2.jpg" alt="Team Member" />
            <TeamMemberName>David Chen</TeamMemberName>
            <TeamMemberRole>Lead Developer</TeamMemberRole>
            <TeamMemberBio>
              David brings 8 years of web development experience and a passion for creating intuitive interfaces.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberImage src="/images/team/avatar3.jpg" alt="Team Member" />
            <TeamMemberName>Sophia Martinez</TeamMemberName>
            <TeamMemberRole>Content Creator</TeamMemberRole>
            <TeamMemberBio>
              Sophia combines her background in psychology with her Tarot knowledge to create meaningful interpretations.
            </TeamMemberBio>
          </TeamMember>

          <TeamMember>
            <TeamMemberImage src="/images/team/avatar4.jpg" alt="Team Member" />
            <TeamMemberName>Michael Johnson</TeamMemberName>
            <TeamMemberRole>UX Designer</TeamMemberRole>
            <TeamMemberBio>
              Michael's design philosophy focuses on creating magical yet intuitive user experiences.
            </TeamMemberBio>
          </TeamMember>
        </TeamGrid>
      </AboutSection>

      <AboutSection>
        <SectionTitle>Our Values</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>✨</ValueIcon>
            <ValueTitle>Authenticity</ValueTitle>
            <ValueDescription>
              We stay true to Tarot traditions while making them relevant for modern life
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>🤝</ValueIcon>
            <ValueTitle>Inclusivity</ValueTitle>
            <ValueDescription>
              Our content is designed to be meaningful for people of all backgrounds and beliefs
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>🔍</ValueIcon>
            <ValueTitle>Self-Reflection</ValueTitle>
            <ValueDescription>
              We emphasize Tarot as a tool for personal insight rather than fortune-telling
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>🌱</ValueIcon>
            <ValueTitle>Growth</ValueTitle>
            <ValueDescription>
              We're always learning and improving our understanding of Tarot and our users' needs
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>
      </AboutSection>

      <AboutSection>
        <SectionTitle>Contact Us</SectionTitle>
        <SectionContent>
          <p>
            We love hearing from our users! Whether you have a question, suggestion, or just want to
            share your experience with our app, feel free to reach out to us.
          </p>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>📧</ContactIcon>
              <ContactText>hello@tarotinsights.com</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>🐦</ContactIcon>
              <ContactText>@TarotInsightsApp</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📱</ContactIcon>
              <ContactText>@tarot_insights</ContactText>
            </ContactItem>
          </ContactInfo>
        </SectionContent>
      </AboutSection>
    </AboutContainer>
  );
};

// Styled Components
const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const AboutHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const AboutSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--color-text);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AboutSection = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: var(--color-secondary);
  }
`;

const SectionContent = styled.div`
  color: var(--color-text);
  line-height: 1.8;
  
  p {
    margin-bottom: 1.2rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const TeamMemberImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid var(--color-primary-light);
`;

const TeamMemberName = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.3rem;
`;

const TeamMemberRole = styled.p`
  font-size: 0.9rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const TeamMemberBio = styled.p`
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.6;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

const ValueDescription = styled.p`
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.5rem;
`;

const ContactText = styled.span`
  font-size: 1.1rem;
  color: var(--color-text);
`;

export default About; 