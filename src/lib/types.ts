export type CandidatePosition = 'President' | 'Vice-President' | 'Secretary';

export type Candidate = {
  id: string;
  name: string;
  position: CandidatePosition;
  manifesto: string;
  imageUrl: string;
  votes: number;
};

export type User = {
  id: string; // email or college ID
  name: string;
  type: 'student';
  hasVoted: boolean;
};

export type Admin = {
  id: string; // username
  name: string;
  type: 'admin';
};

export type AuthUser = {
    id: string;
    name: string;
}
