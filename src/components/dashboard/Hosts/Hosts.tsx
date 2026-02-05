// pages/hosts/HostsPage.tsx
import {
    Calendar,
    Car,
    Copy,
    Eye,
    Filter,
    Lock,
    Mail,
    Pencil,
    Search,
    UserPlus
} from "lucide-react";

import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from "../../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import HostDetailsModal from "./HostDetailsModal";

export default function Hosts() {    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHost, setSelectedHost] = useState<any>(null);
    const [openHostDetails, setOpenHostDetails] = useState(false);


    console.log("openHostDetails", openHostDetails);
    console.log("selectedHost", selectedHost);

    const hosts = [
        {
            membershipId: "MEM-2023-001",
            name: "Sarah Miller",
            joined: "2023-11-10",
            email: "sarah.miller@host.com",
            password: "•••••••••",
            totalVehicles: 3,
            revenue: 15600,
            trips: 87,
            status: "active",
            vehicles: [
                {
                    id: 'veh-001',
                    name: 'Toyota Corolla',
                    plate: 'DHA-1234',
                    status: 'available',
                    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442'
                },
                {
                    id: 'veh-002',
                    name: 'Honda Civic',
                    plate: 'CTG-5678',
                    status: 'booked',
                    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70'
                },
                {
                    id: 'veh-003',
                    name: 'BMW X5',
                    plate: 'DHA-9087',
                    status: 'rented',
                    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753'
                },
                {
                    id: 'veh-004',
                    name: 'Mercedes-Benz C-Class',
                    plate: 'SYL-4455',
                    status: 'maintenance',
                    image: 'https://images.unsplash.com/photo-1617531653520-4893f1e6f5f9'
                },
                {
                    id: 'veh-005',
                    name: 'Toyota Hiace',
                    plate: 'DHA-7788',
                    status: 'available',
                    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2'
                }
            ]
        },
        {
            membershipId: "MEM-2023-002",
            name: "Sarah Miller",
            joined: "2023-11-10",
            email: "sarah.miller@host.com",
            password: "•••••••••",
            totalVehicles: 3,
            revenue: 15600,
            trips: 87,
            status: "active",
        },
        {
            membershipId: "MEM-2023-003",
            name: "Sarah Miller",
            joined: "2023-11-10",
            email: "sarah.miller@host.com",
            password: "•••••••••",
            totalVehicles: 3,
            revenue: 15600,
            trips: 87,
            status: "suspended",
        },
        // Add more...
    ]

    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 hover:bg-green-100'
            case 'suspended':
                return 'bg-red-100 text-red-800 hover:bg-red-100'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="">
            < Card className="border-none shadow-sm m-5" >
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h3 className=" text-2xl font-semibold mb-1">Hosts Management</h3>
                            <p className="text-sm text-gray-500">Manage your hosts</p>
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

                                {/* <div className="mt-4">
                                        <AddUserForm
                                            onSubmit={(formData) => {
                                                // Handle form submission here
                                                console.log("Form submitted:", Object.fromEntries(formData));
                                                setIsModalOpen(false);
                                            }}
                                            onCancel={() => setIsModalOpen(false)}
                                        />
                                    </div> */}
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                        <div className="relative w-72">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search host..."
                                className="pl-10 bg-white"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-45 pl-6">Membership id</TableHead>
                                <TableHead className="w-55">Host</TableHead>
                                <TableHead className="w-70">E-mail and password</TableHead>
                                <TableHead className="w-25 text-center">Vehicles</TableHead>
                                <TableHead className="w-35 text-center">Revenue</TableHead>
                                <TableHead className="w-30 text-center">Total trips</TableHead>
                                <TableHead className="w-30 text-center">Status</TableHead>
                                <TableHead className="w-35 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {hosts.map((host, index) => (
                                <TableRow key={index} data-aos="fade-up" data-aos-delay={index * 100} className="hover:bg-muted/30">
                                    <TableCell className="pl-6 font-medium">
                                        <div className="space-y-1">
                                            <div>{host.membershipId}</div>
                                            <div className="text-xs text-muted-foreground">
                                                Joined: {host.joined}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="font-medium">{host.name}</div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                <span>{host.email}</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <Copy className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Lock className="h-4 w-4 text-muted-foreground" />
                                                <span>{host.password}</span>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                                    <Copy className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Car className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">{host?.totalVehicles}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center font-medium text-green-700">
                                        ${host.revenue.toLocaleString()}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{host.trips}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 capitalize ${getStatusVariant(host.status)}`}
                                        >
                                            {host.status}
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <Button onClick={() => { setOpenHostDetails(true); setSelectedHost(host) }} variant="ghost" size="icon" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </ Card>
            <HostDetailsModal open={openHostDetails} host={selectedHost} onClose={() => { setOpenHostDetails(false); setSelectedHost(null) }} />
        </div>
    )
}