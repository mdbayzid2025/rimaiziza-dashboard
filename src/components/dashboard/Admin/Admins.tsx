import { Edit, Lock, Mail, Search, Trash2, Unlock, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader } from '../../ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../ui/table';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../ui/pagination';
import AddAdminForm from './AddAdminForm';
import { useGetAdminQuery } from '../../../redux/features/user/userApi';




export default function AdminManage({ totalPages = 5 }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 6;

    const { data: adminsData } = useGetAdminQuery({});

    console.log("adminsData", adminsData);


    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const getPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Sample admin data
    const admins = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@admin.com',
            role: 'ADMIN',
            status: 'Active',
            joinDate: '2024-01-15',
            lastLogin: '2024-02-08 10:30 AM',
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@admin.com',
            role: 'ADMIN',
            status: 'Active',
            joinDate: '2023-11-20',
            lastLogin: '2024-02-08 09:15 AM',
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.c@admin.com',
            role: 'ADMIN',
            status: 'Inactive',
            joinDate: '2023-08-10',
            lastLogin: '2024-01-25 03:45 PM',
        },
        {
            id: 4,
            name: 'Emily Rodriguez',
            email: 'emily.r@admin.com',
            role: 'ADMIN',
            status: 'Active',
            joinDate: '2024-01-05',
            lastLogin: '2024-02-07 04:20 PM',
        },
        {
            id: 5,
            name: 'David Kim',
            email: 'david.k@admin.com',
            role: 'ADMIN',
            status: 'Active',
            joinDate: '2023-12-12',
            lastLogin: '2024-02-08 08:00 AM',
        },
        {
            id: 6,
            name: 'Lisa Anderson',
            email: 'lisa.a@admin.com',
            role: 'ADMIN',
            status: 'Pending',
            joinDate: '2024-02-05',
            lastLogin: 'Never',
        },
    ];

    const getStatusBadge = (status: any) => {
        const variants = {
            Active: 'bg-green-100 text-green-800 hover:bg-green-100',
            Inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
            Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
        };
        return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
    };

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

    const handleFormSubmit = (formData: FormData) => {
        const data = Object.fromEntries(formData);

        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'ADMIN', // Always ADMIN
        };

        console.log('Admin Creation Payload:', payload);
        console.log('JSON Format:', JSON.stringify(payload, null, 2));
        setIsModalOpen(false);
    };

    return (
        <div className="p-5">
            <Card className="w-full border-none shadow-lg gap-0">
                <CardHeader className="">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Admin Management</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Manage and monitor administrator accounts
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="text"
                                    placeholder="Search admins..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-purple-600 hover:bg-purple-700">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Add Admin
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl">Add New Administrator</DialogTitle>
                                    </DialogHeader>
                                    <AddAdminForm
                                        onSubmit={handleFormSubmit}
                                        onCancel={() => setIsModalOpen(false)}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className=" border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="font-semibold text-gray text-gray-600 text-md pl-10">Admin</TableHead>
                                    <TableHead className="font-semibold text-gray text-gray-600 text-md">Contact</TableHead>
                                    <TableHead className="font-semibold text-gray text-gray-600 text-md">Role</TableHead>
                                    <TableHead className="font-semibold text-gray text-gray-600 text-md">Status</TableHead>
                                    <TableHead className="font-semibold text-gray text-gray-600 text-md text-right pr-10">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adminsData?.data?.length ? adminsData?.data?.map((admin: any, index: number) => (
                                    <TableRow key={admin.id} className="hover:bg-gray-50" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <TableCell>
                                            <div className="flex items-center gap-3 pl-5 py-2">
                                                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                                                    {admin.name
                                                        .split(' ')
                                                        .map((n: any) => n[0])
                                                        .join('')}
                                                </div>
                                                <span className="font-medium text-gray-900">{admin.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail size={14} />
                                                {admin.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 font-semibold">
                                                {admin.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusBadge(admin.status)}>{admin.status}</Badge>
                                        </TableCell>                                        
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-2 pr-5">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-amber-50 hover:text-amber-600"
                                                >
                                                    {admin?.status?.toLowerCase() === 'active' ? (
                                                        <Lock size={16} />
                                                    ) : (
                                                        <Unlock size={16} />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:bg-red-50 hover:text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg">No admins found matching your search.</p>
                                </div>}
                            </TableBody>
                        </Table>

                        {filteredAdmins.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">No admins found matching your search.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6">

                        <Pagination className="flex justify-end items-center p-4">
                            <PaginationContent>
                                {/* Previous */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        size="default"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className='text-black!'
                                    />
                                </PaginationItem>

                                {/* Page Numbers */}
                                {getPages().map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            size="default"
                                            isActive={page === currentPage}
                                            onClick={() => handlePageChange(page)}
                                            className={
                                                page === currentPage
                                                    ? "bg-indigo-600 text-white! hover:bg-indigo-700"
                                                    : "bg-slate-100 text-gray-600! hover:bg-gray-100 "
                                            }
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Next */}
                                <PaginationItem>
                                    <PaginationNext
                                        size="default"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className='text-black!'
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}