import type { User, Admin, Candidate, CandidatePosition } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockUsers: User[] = [
  { id: 'student1@college.edu', name: 'John Doe', type: 'student', hasVoted: false },
  { id: 'student2@college.edu', name: 'Jane Smith', type: 'student', hasVoted: true },
];

export const mockAdmins: Admin[] = [
    { id: 'admin', name: 'Admin User', type: 'admin' },
    { id: 'i', name: 'Super Admin', type: 'admin' },
];

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    position: 'President',
    manifesto: 'Dedicated to enhancing student life through proactive leadership, transparency, and improved campus facilities. My goal is to create a more inclusive and vibrant community for everyone.',
    imageUrl: getImage('candidate-1'),
    votes: 150,
  },
  {
    id: '2',
    name: 'Bob Williams',
    position: 'President',
    manifesto: 'I will work to bridge the gap between students and administration. My focus is on academic excellence, mental health support, and fostering a collaborative environment for all.',
    imageUrl: getImage('candidate-2'),
    votes: 120,
  },
  {
    id: '3',
    name: 'Charlie Brown',
    position: 'Vice-President',
    manifesto: 'My mission is to support student initiatives and clubs. I will advocate for more funding for extracurricular activities and ensure every student\'s voice is heard and valued.',
    imageUrl: getImage('candidate-3'),
    votes: 180,
  },
  {
    id: '4',
    name: 'Diana Miller',
    position: 'Vice-President',
    manifesto: 'I aim to improve campus safety and sustainability. I will push for green initiatives and work closely with security to create a safer learning environment for all students.',
    imageUrl: getImage('candidate-4'),
    votes: 95,
  },
  {
    id: '5',
    name: 'Ethan Davis',
    position: 'Secretary',
    manifesto: 'Focused on improving communication and organization within the student government. I will ensure all meetings are documented and accessible, and that information flows freely to students.',
    imageUrl: getImage('candidate-5'),
    votes: 140,
  },
  {
    id: '6',
    name: 'Fiona Garcia',
    position: 'Secretary',
    manifesto: 'I will bring efficiency and clarity to the student council. My goal is to streamline processes, manage records effectively, and be a reliable point of contact for all student inquiries.',
    imageUrl: getImage('candidate-6'),
    votes: 130,
  },
];

export const positions: CandidatePosition[] = ['President', 'Vice-President', 'Secretary'];
