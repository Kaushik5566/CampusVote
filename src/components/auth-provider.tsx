
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { mockUsers, mockAdmins, mockCandidates } from '@/lib/data';
import type { User, Admin, Candidate, AuthUser, Election } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type AuthContextType = {
  user: User | Admin | null;
  login: (id: string, pass: string, userType: 'student' | 'admin') => boolean;
  logout: () => void;
  register: (user: AuthUser, type: 'student' | 'admin') => boolean;
  candidates: Candidate[];
  submitVote: (votes: Record<string, string>) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'votes' | 'imageUrl'> & { imageUrl?: string }) => void;
  updateCandidate: (candidate: Candidate) => void;
  deleteCandidate: (candidateId: string) => void;
  resultsPublished: boolean;
  setResultsPublished: (published: boolean) => void;
  votingStartDate: Date;
  votingEndDate: Date;
  setVotingStartDate: (date: Date) => void;
  setVotingEndDate: (date: Date) => void;
  electionHistory: Election[];
  archiveCurrentElection: () => void;
  updateStudentDetails: (updatedStudent: User) => void;
  findStudentByEmail: (email: string) => User | undefined;
  verifySecurityAnswer: (email: string, answer: string) => boolean;
  resetStudentPassword: (email: string, newPassword: string) => boolean;
  admins: Admin[];
  addAdmin: (admin: Omit<Admin, 'type'>) => boolean;
  deleteAdmin: (adminId: string) => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Helper function to load state from sessionStorage
const loadState = <T,>(key: string, defaultValue: T, reviver?: (key: any, value: any) => any): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const storedValue = sessionStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue, reviver);
        }
    } catch (error) {
        console.error(`Failed to parse ${key} from sessionStorage`, error);
        sessionStorage.removeItem(key);
    }
    return defaultValue;
};

const dateReviver = (key: string, value: any) => {
    if (key === 'dob' || key === 'votingStartDate' || key === 'votingEndDate') {
        if(value) return new Date(value);
    }
    return value;
};


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | Admin | null>(() => loadState<User | Admin | null>('user', null, dateReviver));
  const [candidates, setCandidates] = useState<Candidate[]>(() => loadState<Candidate[]>('candidates', mockCandidates));
  const [resultsPublished, setResultsPublished] = useState<boolean>(() => loadState<boolean>('resultsPublished', false));
  const [votingStartDate, setVotingStartDate] = useState<Date>(() => loadState<Date>('votingStartDate', new Date(), dateReviver));
  const [votingEndDate, setVotingEndDate] = useState<Date>(() => {
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 7);
    return loadState<Date>('votingEndDate', defaultEndDate, dateReviver);
  });
  const [users, setUsers] = useState<User[]>(() => loadState<User[]>('users', mockUsers, dateReviver));
  const [admins, setAdmins] = useState<Admin[]>(() => loadState<Admin[]>('admins', mockAdmins));
  const [electionHistory, setElectionHistory] = useState<Election[]>(() => loadState<Election[]>('electionHistory', []));
  const [loading, setLoading] = useState(false); // No longer need initial loading state for session storage
  
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    sessionStorage.setItem('resultsPublished', JSON.stringify(resultsPublished));
  }, [resultsPublished]);

  useEffect(() => {
    sessionStorage.setItem('votingStartDate', JSON.stringify(votingStartDate));
  }, [votingStartDate]);

  useEffect(() => {
    sessionStorage.setItem('votingEndDate', JSON.stringify(votingEndDate));
  }, [votingEndDate]);

  useEffect(() => {
    sessionStorage.setItem('users', JSON.stringify(users));
  }, [users]);

    useEffect(() => {
    sessionStorage.setItem('admins', JSON.stringify(admins));
    }, [admins]);
    
    useEffect(() => {
        sessionStorage.setItem('electionHistory', JSON.stringify(electionHistory));
    }, [electionHistory]);


  const login = (id: string, pass: string, userType: 'student' | 'admin'): boolean => {
    if (userType === 'student') {
        const student = users.find(u => u.id === id);
        if (student && student.password === pass) {
            setUser(student);
            router.push('/dashboard');
            return true;
        }
    } else if (userType === 'admin') {
        const admin = admins.find(a => a.id === id);
        if (admin && admin.password === pass) {
            setUser(admin);
            router.push('/admin/dashboard');
            return true;
        }
    }

    setLoginError(true);
    return false;
  };

  const setLoginError = (isError: boolean) => {
    // This is a placeholder function. The actual implementation in the login page
    // will use its own local state to show/hide the error message.
    // The key change is that `login` now reliably returns false on failure.
  };

  const register = (newUser: AuthUser, type: 'student' | 'admin'): boolean => {
    if(type === 'student'){
      if (users.find(u => u.id === newUser.id)) {
        toast({
          title: 'Registration Failed',
          description: 'A student with this email already exists.',
          variant: 'destructive',
        });
        return false;
      }
      const newStudent: User = { 
          ...newUser,
          rollNo: newUser.rollNo,
          collegeName: newUser.collegeName || 'N/A', 
          course: newUser.course || 'N/A',
          year: newUser.year,
          type: 'student', 
          hasVoted: false,
          securityQuestion: newUser.securityQuestion,
          securityAnswer: newUser.securityAnswer,
          password: newUser.password,
      };
      setUsers(prev => [...prev, newStudent]);
      setUser(newStudent);
      router.push('/dashboard');
    }

    toast({
      title: 'Registration Successful',
      description: `Welcome, ${newUser.name}!`,
    });
    return true;
  };

  const logout = () => {
    const userType = user?.type;
    setUser(null);
    sessionStorage.removeItem('user');
    
    if (userType === 'admin') {
      router.push('/admin/login');
    } else {
      router.push('/login');
    }
  };

  const submitVote = (votes: Record<string, string>) => {
    if (user?.type !== 'student' || user.hasVoted) return;

    setCandidates(prev => {
        const newCandidates = [...prev];
        Object.values(votes).forEach(candidateId => {
            const candidate = newCandidates.find(c => c.id === candidateId);
            if(candidate) {
                candidate.votes++;
            }
        });
        return newCandidates;
    });

    const updatedUser = { ...user, hasVoted: true };
    setUser(updatedUser as User);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? (updatedUser as User) : u));


    toast({
      title: 'Vote Submitted!',
      description: 'Thank you for participating.',
    });
  };

  const addCandidate = (candidateData: Omit<Candidate, 'id' | 'votes' | 'imageUrl'> & { imageUrl?: string }) => {
    const newCandidate: Candidate = {
        ...candidateData,
        id: (candidates.length + 1).toString(),
        votes: 0,
        imageUrl: candidateData.imageUrl || `https://picsum.photos/seed/${Date.now()}/400/400`,
    };
    setCandidates(prev => [...prev, newCandidate]);
  };

  const updateCandidate = (updatedCandidate: Candidate) => {
    setCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
  };
  
  const deleteCandidate = (candidateId: string) => {
    setCandidates(prev => prev.filter(c => c.id !== candidateId));
  };

  const archiveCurrentElection = () => {
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    if (totalVotes === 0) {
        toast({
            title: "Archive Failed",
            description: "Cannot archive an election with no votes.",
            variant: "destructive",
        });
        return;
    }

    const newElection: Election = {
        id: `election-${Date.now()}`,
        name: `Election Ended ${format(new Date(), 'PPpp')}`,
        startDate: votingStartDate.toISOString(),
        endDate: votingEndDate.toISOString(),
        results: JSON.parse(JSON.stringify(candidates)), // Deep copy
        totalVotes: totalVotes,
    };

    setElectionHistory(prev => [newElection, ...prev]);

    setCandidates(prev => prev.map(c => ({...c, votes: 0})));
    setUsers(prev => prev.map(u => ({...u, hasVoted: false})));

    toast({
        title: "Election Archived",
        description: "The current election results have been saved to history and votes have been reset."
    });
  };

  const updateStudentDetails = (updatedStudent: User) => {
    setUsers(prev => prev.map(u => u.id === updatedStudent.id ? updatedStudent : u));
    setUser(updatedStudent);
    toast({
        title: 'Profile Updated',
        description: 'Your details have been successfully updated.',
    });
  };

  const findStudentByEmail = (email: string): User | undefined => {
    return users.find(u => u.id === email);
  };

  const verifySecurityAnswer = (email: string, answer: string): boolean => {
    const student = findStudentByEmail(email);
    // Case-insensitive comparison
    return !!student && student.securityAnswer.toLowerCase() === answer.toLowerCase();
  };

  const resetStudentPassword = (email: string, newPassword: string): boolean => {
      const studentExists = users.some(u => u.id === email);
      if (!studentExists) {
        return false;
      }
      setUsers(prevUsers => prevUsers.map(u => u.id === email ? {...u, password: newPassword} : u));
      return true;
  };

  const addAdmin = (newAdminData: Omit<Admin, 'type'>): boolean => {
    if (admins.find(a => a.id === newAdminData.id)) {
        toast({
            title: 'Action Failed',
            description: `An admin with the username "${newAdminData.id}" already exists.`,
            variant: 'destructive',
        });
        return false;
    }
    const newAdmin: Admin = {
        ...newAdminData,
        type: 'admin',
    };
    setAdmins(prev => [...prev, newAdmin]);
    return true;
  };

  const deleteAdmin = (adminId: string): boolean => {
    if (adminId === user?.id) {
        toast({
            title: 'Action Forbidden',
            description: 'You cannot delete your own admin account.',
            variant: 'destructive',
        });
        return false;
    }
    setAdmins(prev => prev.filter(a => a.id !== adminId));
    return true;
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, register, candidates, submitVote, addCandidate, updateCandidate, deleteCandidate, resultsPublished, setResultsPublished, votingStartDate, votingEndDate, setVotingStartDate, setVotingEndDate, electionHistory, archiveCurrentElection, updateStudentDetails, findStudentByEmail, verifySecurityAnswer, resetStudentPassword, admins, addAdmin, deleteAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

    