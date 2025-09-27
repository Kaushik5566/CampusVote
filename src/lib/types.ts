

export type Candidate = {
  id: string;
  name: string;
  position: string;
  manifesto: string;
  imageUrl: string;
  votes: number;
};

export type User = {
  id: string; // unique generated id
  email: string; // college email
  name: string;
  rollNo: string;
  dob: Date;
  collegeName: string;
  course: string;
  year?: 'FY' | 'SY' | 'TY';
  type: 'student';
  hasVoted: boolean;
  securityQuestion: string;
  securityAnswer: string;
  password?: string;
};

export type Admin = {
  id:string; // username
  name: string;
  type: 'admin';
  password?: string;
};

export type AuthUser = {
    email: string;
    name: string;
    rollNo: string;
    dob: Date;
    collegeName?: string;
    course?: string;
    year?: 'FY' | 'SY' | 'TY';
    securityQuestion: string;
    securityAnswer: string;
    password?: string;
}

export type Election = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    results: Candidate[];
    totalVotes: number;
}
