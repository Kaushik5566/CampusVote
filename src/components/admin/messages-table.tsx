
'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollection, useFirebase, useMemoFirebase, WithId } from '@/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: {
        toDate: () => Date;
    };
}

export function MessagesTable() {
    const { firestore } = useFirebase();

    const messagesCollectionQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'contact_messages'), orderBy('timestamp', 'desc'));
    }, [firestore]);

    const { data: messages, isLoading } = useCollection<ContactMessage>(messagesCollectionQuery);

    if (isLoading) {
        return <p>Loading messages...</p>;
    }

    if (!messages || messages.length === 0) {
        return <p>No messages yet.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Received</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {messages.map((message) => (
                    <TableRow key={message.id}>
                        <TableCell>
                            <div className="font-medium">{message.name}</div>
                            <div className="text-sm text-muted-foreground">{message.email}</div>
                        </TableCell>
                        <TableCell className="max-w-sm whitespace-pre-wrap">{message.message}</TableCell>
                        <TableCell className="text-right">
                            {message.timestamp ? formatDistanceToNow(message.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
