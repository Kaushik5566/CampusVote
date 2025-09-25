'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { mockUsers, mockAdmins, mockCandidates } from '@/lib/data';
import type { User, Admin, Candidate, AuthUser } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  user: User | Admin | null;
  login: (id: string, pass: string) => boolean;
  logout: () => void;
  register: (user: AuthUser, type: 'student' | 'admin') => boolean;
  candidates: Candidate[];
  submitVote: (votes: Record<string, string>) => void;
  addCandidate: (candidate: Omit<Candidate, 'id' | 'votes' | 'imageUrl'> & { imageUrl?: string }) => void;
  updateCandidate: (candidate: Candidate) => void;
  deleteCandidate: (candidateId: string) => void;
  resultsPublished: boolean;
  setResultsPublished: (published: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | Admin | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [resultsPublished, setResultsPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      const storedCandidates = sessionStorage.getItem('candidates');
      const storedResults = sessionStorage.getItem('resultsPublished');
      const storedUsers = sessionStorage.getItem('users');
      const storedAdmins = sessionStorage.getItem('admins');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedCandidates) {
        setCandidates(JSON.parse(storedCandidates));
      }
      if (storedResults) {
        setResultsPublished(JSON.parse(storedResults));
      }
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
      if (storedAdmins) {
        setAdmins(JSON.parse(storedAdmins));
      }

    } catch (error) {
      console.error("Failed to parse from sessionStorage", error);
      sessionStorage.clear();
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    if (loading) return;
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    sessionStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates, loading]);

  useEffect(() => {
    if (loading) return;
    sessionStorage.setItem('resultsPublished', JSON.stringify(resultsPublished));
  }, [resultsPublished, loading]);

  useEffect(() => {
    if (loading) return;
    sessionStorage.setItem('users', JSON.stringify(users));
  }, [users, loading]);

    useEffect(() => {
    if (loading) return;
    sessionStorage.setItem('admins', JSON.stringify(admins));
    }, [admins, loading]);


  const login = (id: string, pass: string): boolean => {
    const student = users.find(u => u.id === id);
    if (student) {
      // For mock purposes, any password is fine for students for now
      setUser(student);
      router.push('/dashboard');
      return true;
    }

    const admin = admins.find(a => a.id === id);
    if (admin) {
      if (id === 'Kaushik' && pass === 'Kaushik@2004') {
         setUser(admin);
         router.push('/admin/candidates');
         return true;
      } else {
        toast({
            title: 'Login Failed',
            description: 'Invalid credentials for admin.',
            variant: 'destructive',
        });
        return false;
      }
    }
    
    toast({
        title: 'Login Failed',
        description: 'User not found.',
        variant: 'destructive',
    });
    return false;
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
      const newStudent: User = { ...newUser, type: 'student', hasVoted: false };
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
    // Don't clear all session storage, to persist users
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


  return (
    <AuthContext.Provider value={{ user, login, logout, register, candidates, submitVote, addCandidate, updateCandidate, deleteCandidate, resultsPublished, setResultsPublished }}>
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
