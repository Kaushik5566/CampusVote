
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { MessagesTable } from '@/components/admin/messages-table';
  
  export default function AdminMessagesPage() {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold md:text-2xl">Contact Messages</h1>
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>
              Messages submitted through the contact form.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MessagesTable />
          </CardContent>
        </Card>
      </div>
    );
  }
  