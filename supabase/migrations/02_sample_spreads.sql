-- Insert sample spreads
INSERT INTO spreads (name, description, layout, is_premium) VALUES
(
  'Three Card Spread',
  'A simple spread that can be used for past-present-future readings or situation-action-outcome interpretations.',
  '{
    "positions": [
      {
        "name": "Past / Situation",
        "description": "Represents the past or the current situation you are inquiring about."
      },
      {
        "name": "Present / Action",
        "description": "Represents the present moment or the action you should take."
      },
      {
        "name": "Future / Outcome",
        "description": "Represents the future or the outcome if you follow the guidance."
      }
    ]
  }',
  false
),
(
  'Celtic Cross',
  'A comprehensive 10-card spread that provides deep insight into a specific question or situation.',
  '{
    "positions": [
      {
        "name": "The Present",
        "description": "Represents the present situation or the energy surrounding the question."
      },
      {
        "name": "The Challenge",
        "description": "Represents the immediate challenge or obstacle."
      },
      {
        "name": "The Past",
        "description": "Shows the past events or influences related to the question."
      },
      {
        "name": "The Future",
        "description": "Indicates what is coming in the near future if the current course is maintained."
      },
      {
        "name": "Above",
        "description": "Represents your conscious thoughts, goals, and ideals."
      },
      {
        "name": "Below",
        "description": "Shows your subconscious influences, hidden feelings, and motivations."
      },
      {
        "name": "Advice",
        "description": "Suggests the best approach to take in the situation."
      },
      {
        "name": "External Influences",
        "description": "Indicates how others see you or external factors affecting the situation."
      },
      {
        "name": "Hopes and Fears",
        "description": "Reveals your hopes and fears regarding the outcome."
      },
      {
        "name": "Outcome",
        "description": "Shows the likely outcome based on the current trajectory."
      }
    ]
  }',
  false
),
(
  'Relationship Spread',
  'A 5-card spread designed to provide insight into a relationship dynamic.',
  '{
    "positions": [
      {
        "name": "You",
        "description": "Represents your energy and approach in the relationship."
      },
      {
        "name": "The Other Person",
        "description": "Represents the other person''s energy and approach."
      },
      {
        "name": "The Connection",
        "description": "Shows the nature of your connection and what brings you together."
      },
      {
        "name": "Challenges",
        "description": "Indicates the challenges or obstacles in the relationship."
      },
      {
        "name": "Potential",
        "description": "Reveals the potential or direction of the relationship."
      }
    ]
  }',
  false
),
(
  'Career Path',
  'A 6-card spread focused on career guidance and professional development.',
  '{
    "positions": [
      {
        "name": "Current Position",
        "description": "Represents your current career situation."
      },
      {
        "name": "Challenges",
        "description": "Shows obstacles or challenges in your career path."
      },
      {
        "name": "Strengths",
        "description": "Indicates your professional strengths and assets."
      },
      {
        "name": "Opportunities",
        "description": "Reveals potential opportunities or directions."
      },
      {
        "name": "Action",
        "description": "Suggests actions to take for career advancement."
      },
      {
        "name": "Outcome",
        "description": "Shows the potential outcome of following this path."
      }
    ]
  }',
  true
),
(
  'Monthly Forecast',
  'A premium 12-card spread that provides guidance for each month of the year.',
  '{
    "positions": [
      {"name": "January", "description": "Guidance for January"},
      {"name": "February", "description": "Guidance for February"},
      {"name": "March", "description": "Guidance for March"},
      {"name": "April", "description": "Guidance for April"},
      {"name": "May", "description": "Guidance for May"},
      {"name": "June", "description": "Guidance for June"},
      {"name": "July", "description": "Guidance for July"},
      {"name": "August", "description": "Guidance for August"},
      {"name": "September", "description": "Guidance for September"},
      {"name": "October", "description": "Guidance for October"},
      {"name": "November", "description": "Guidance for November"},
      {"name": "December", "description": "Guidance for December"}
    ]
  }',
  true
);
