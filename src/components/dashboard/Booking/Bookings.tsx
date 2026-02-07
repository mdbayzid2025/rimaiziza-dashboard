// pages/bookings/BookingsPage.tsx
import { Calendar, Eye, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import BookingDetailsModal from "./BookingDetailsModal";

export default function Bookings() {
    const [openBookingDetails, setOpenBookingDetails] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    console.log("openBookingDetails", openBookingDetails);
    console.log("selectedBooking", selectedBooking);

    const bookings = [
        {
            bookingId: "BK001",
            customer: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1 234-567-8900"
            },
            host: {
                name: "Sarah Miller",
                email: "sarah.miller@host.com",
                phone: "+1 234-567-8901"
            },
            vehicle: {
                name: "2023 Tesla Model 3",
                plate: "DHA-1234",
                image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89"
            },
            dates: {
                start: "2025-01-20",
                end: "2025-01-25",
                duration: 5
            },
            pricing: {
                dailyRate: 120,
                days: 5,
                subtotal: 600,
                platformFee: 90,
                platformFeePercentage: 15,
                hostEarnings: 510,
                total: 600
            },
            status: "requested",
            createdAt: "2025-01-15 10:30 AM"
        },
        {
            bookingId: "BK002",
            customer: {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "+1 234-567-8902"
            },
            host: {
                name: "Mike Johnson",
                email: "mike.johnson@host.com",
                phone: "+1 234-567-8903"
            },
            vehicle: {
                name: "2022 BMW X5",
                plate: "CTG-5678",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e"
            },
            dates: {
                start: "2025-01-18",
                end: "2025-01-22",
                duration: 4
            },
            pricing: {
                dailyRate: 180,
                days: 4,
                subtotal: 720,
                platformFee: 108,
                platformFeePercentage: 15,
                hostEarnings: 612,
                total: 720
            },
            status: "confirmed",
            createdAt: "2025-01-14 02:15 PM"
        },
        {
            bookingId: "BK003",
            customer: {
                name: "Robert Brown",
                email: "robert.brown@example.com",
                phone: "+1 234-567-8904"
            },
            host: {
                name: "Sarah Miller",
                email: "sarah.miller@host.com",
                phone: "+1 234-567-8901"
            },
            vehicle: {
                name: "2023 Tesla Model 3",
                plate: "DHA-1234",
                image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89"
            },
            dates: {
                start: "2025-01-20",
                end: "2025-01-25",
                duration: 5
            },
            pricing: {
                dailyRate: 120,
                days: 5,
                subtotal: 600,
                platformFee: 90,
                platformFeePercentage: 15,
                hostEarnings: 510,
                total: 600
            },
            status: "pending",
            createdAt: "2025-01-13 11:45 AM"
        },
        {
            bookingId: "BK004",
            customer: {
                name: "Emily Davis",
                email: "emily.davis@example.com",
                phone: "+1 234-567-8905"
            },
            host: {
                name: "Mike Johnson",
                email: "mike.johnson@host.com",
                phone: "+1 234-567-8903"
            },
            vehicle: {
                name: "2021 Honda Civic",
                plate: "DHA-9087",
                image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7"
            },
            dates: {
                start: "2025-01-10",
                end: "2025-01-15",
                duration: 5
            },
            pricing: {
                dailyRate: 85,
                days: 5,
                subtotal: 425,
                platformFee: 64,
                platformFeePercentage: 15,
                hostEarnings: 361,
                total: 425
            },
            status: "completed",
            createdAt: "2025-01-08 09:20 AM"
        },
        {
            bookingId: "BK005",
            customer: {
                name: "Michael Wilson",
                email: "michael.wilson@example.com",
                phone: "+1 234-567-8906"
            },
            host: {
                name: "Sarah Miller",
                email: "sarah.miller@host.com",
                phone: "+1 234-567-8901"
            },
            vehicle: {
                name: "2023 Mercedes-Benz C-Class",
                plate: "SYL-4455",
                image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
            },
            dates: {
                start: "2025-01-05",
                end: "2025-01-08",
                duration: 3
            },
            pricing: {
                dailyRate: 200,
                days: 3,
                subtotal: 600,
                platformFee: 90,
                platformFeePercentage: 15,
                hostEarnings: 510,
                total: 600
            },
            status: "canceled",
            createdAt: "2025-01-03 04:30 PM"
        },
    ];

    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 hover:bg-green-100'
            case 'requested':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
            case 'pending':
                return 'bg-amber-100 text-amber-800 hover:bg-amber-100'
            case 'completed':
                return 'bg-slate-100 text-slate-800 hover:bg-slate-100'
            case 'canceled':
                return 'bg-red-100 text-red-800 hover:bg-red-100'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const matchesSearch = 
            booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            booking.vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesStatus && matchesSearch;
    });

    return (
        <>
            <Card className="border-none shadow-sm m-5">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">All Bookings</h2>
                            <p className="text-muted-foreground text-sm mt-1">
                                Manage your bookings
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search bookings..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px] h-11!">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent align="start">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="requested">Requested</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="canceled">Canceled</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                        </Button>
                    </div>

                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead>Booking ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Vehicle</TableHead>
                                    <TableHead>Host</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredBookings.map((booking, index) => (
                                    <TableRow key={booking.bookingId} data-aos="fade-up" data-aos-delay={index * 100}>
                                        <TableCell>
                                            <div className="font-medium">{booking.bookingId}</div>
                                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {booking.createdAt}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{booking.customer.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{booking.vehicle.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{booking.host.name}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-sm">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                <span className="font-medium">{booking.dates.start}</span>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                to {booking.dates.end}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {booking.dates.duration} days
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold">
                                                ${booking.pricing.total}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {booking.dates.duration} days
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`px-3 py-1 font-medium capitalize ${getStatusVariant(
                                                    booking.status
                                                )}`}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                onClick={() => {
                                                    setOpenBookingDetails(true);
                                                    setSelectedBooking(booking);
                                                }}
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredBookings.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No bookings found matching your criteria.
                        </div>
                    )}
                </CardContent>
            </Card>

            <BookingDetailsModal
                open={openBookingDetails}
                booking={selectedBooking}
                onClose={() => {
                    setOpenBookingDetails(false);
                    setSelectedBooking(null);
                }}
            />
        </>
    );
}