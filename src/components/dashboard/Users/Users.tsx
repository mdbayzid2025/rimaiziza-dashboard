import { Edit, Lock, Mail, Phone, Search, Trash2, Unlock, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '../../ui/pagination';
import AddUserForm from './AddUserForm';

export default function Users({ totalPages = 5 }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 6;


    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
    }

    // Optional: limit visible pages (like Google)
    const getPages = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }


    const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234-567-8900', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234-567-8901', role: 'User', status: 'Active', joinDate: '2024-02-20' },
        { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1 234-567-8902', role: 'Editor', status: 'Inactive', joinDate: '2023-12-10' },
        { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', phone: '+1 234-567-8903', role: 'User', status: 'Active', joinDate: '2024-01-05' },
        { id: 5, name: 'Charlie Brown', email: 'charlie.brown@example.com', phone: '+1 234-567-8904', role: 'Moderator', status: 'Pending', joinDate: '2024-02-28' },
        { id: 6, name: 'Diana Prince', email: 'diana.prince@example.com', phone: '+1 234-567-8905', role: 'Admin', status: 'Active', joinDate: '2023-11-22' },
        { id: 7, name: 'Eve Davis', email: 'eve.davis@example.com', phone: '+1 234-567-8906', role: 'User', status: 'Active', joinDate: '2024-01-18' },
        { id: 8, name: 'Frank Miller', email: 'frank.miller@example.com', phone: '+1 234-567-8907', role: 'Editor', status: 'Inactive', joinDate: '2023-10-25' },
    ];

    const getStatusBadge = (status: any) => {
        const variants = {
            Active: 'bg-green-100 text-green-800 hover:bg-green-100',
            Inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
            Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
        };
        return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
    };

    const getRoleBadge = (role: any) => {
        const variants = {
            Admin: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
            Editor: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
            Moderator: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
            User: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
        };
        return variants[role as keyof typeof variants] || 'bg-gray-100 text-gray-800';
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    return (
        <div className="p-5">
            <Card className=" border-0 ">
                <CardHeader className="" >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h3 className=" text-2xl font-semibold mb-1">User Management</h3>
                            <p className="text-sm text-gray-500">Manage and monitor user accounts</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 w-64"
                                />
                            </div>
                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 border-0">
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Add User
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="min-w-4xl! max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-semibold">Add New User</DialogTitle>
                                    </DialogHeader>

                                    <div className="mt-4">
                                        <AddUserForm
                                            onSubmit={(formData) => {
                                                // Handle form submission here
                                                console.log("Form submitted:", Object.fromEntries(formData));
                                                setIsModalOpen(false);
                                            }}
                                            onCancel={() => setIsModalOpen(false)}
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs pl-10">User</TableHead>
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs">Contact</TableHead>
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs">Role</TableHead>
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs">Status</TableHead>
                                <TableHead className="text-gray-600 font-semibold uppercase text-xs">Join Date</TableHead>
                                <TableHead className="w-25 text-gray-600 font-semibold uppercase text-xs text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentUsers.map((user, index) => (
                                <TableRow key={user.id} className="hover:bg-gray-50" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <TableCell>
                                        <div className="flex items-center gap-3 py-3 pl-5">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                            <Phone className="w-3 h-3" />
                                            {user.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getRoleBadge(user.role)}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusBadge(user.status)}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{user.joinDate}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-3 justify-center">
                                            {user?.status?.toLowerCase() === "active" ?
                                                <Lock className="w-4 h-4 text-red-600 cursor-pointer hover:scale-110 transition-transform" /> :
                                                <Unlock className="w-4 h-4 text-green-600 cursor-pointer hover:scale-110 transition-transform" />
                                            }
                                            <Edit className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform text-blue-600" />
                                            <Trash2 className="w-4 h-4 cursor-pointer hover:scale-110 transition-transform text-red-600" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No users found matching your search.
                        </div>
                    )}

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
                </CardContent>
            </Card>
        </div>
    );
}