# **App Name**: CampusVote

## Core Features:

- Secure Login: Students log in using college ID or email and password. Admins use a separate username and password. Implements password hashing and secure session management.
- Voter Dashboard: Display a list of candidates in card format, showing photo, name, position, and a brief manifesto. Each student can submit their vote, selecting one candidate per position.
- Single Vote Enforcement: Ensure each student can vote only once. Disable voting functionality after a successful vote submission and display a confirmation message.
- Admin Panel: Candidate Management: Admin interface to add, edit, and delete candidate profiles, including photo, name, position, and manifesto.
- Vote Counting: Tally votes for each candidate securely.
- Results Display: Show vote counts as a table. Generate a bar or pie chart.
- Results Publishing: Admin-controlled publishing of the final results. Utilize a tool that predicts whether it should show the voting results.

## Style Guidelines:

- Primary color: Deep violet (#7952B3) evokes the seriousness and importance of an election. 
- Background color: Light lavender (#F2EFFF) offers a soft, desaturated backdrop to let the violet elements stand out.
- Accent color: Indigo (#4B0082), a slightly different violet, draws extra attention to key interactive elements.
- Font: 'Inter' (sans-serif) for both headlines and body text.
- Use simple, clear icons for navigation and actions.
- Employ a responsive layout using Bootstrap or Material UI to ensure compatibility across devices. Implement a card-based design for candidate listings.
- Add subtle animations, like a smooth transition when a user casts their vote.