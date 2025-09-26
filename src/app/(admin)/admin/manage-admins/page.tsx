
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { AdminForm } from '@/components/admin/admin-form';
import { AdminsTable } from '@/components/admin/admins-table';

export default function ManageAdminsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Admins</h1>
        <div className="ml-auto flex items-center gap-2">
          <AdminForm>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Admin
              </span>
            </Button>
          </AdminForm>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Administrator Accounts</CardTitle>
          <CardDescription>
            Add or remove admin users for the election system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminsTable />
        </CardContent>
      </Card>
    </>
  );
}
