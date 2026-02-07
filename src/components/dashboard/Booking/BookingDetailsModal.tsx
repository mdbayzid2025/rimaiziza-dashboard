// components/booking/BookingDetailsModal.tsx
import { Copy } from "lucide-react"
import { useState } from 'react'
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "../../ui/dialog"
import Swal from 'sweetalert2';


interface BookingDetailsModalProps {
    open: boolean
    onClose: () => void
    booking?: any,
}

export default function BookingDetailsModal({ open, onClose, booking }: BookingDetailsModalProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': return 'bg-green-100 text-green-800 hover:bg-green-100'
            case 'requested': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
            case 'pending': return 'bg-amber-100 text-amber-800 hover:bg-amber-100'
            case 'completed': return 'bg-slate-100 text-slate-800 hover:bg-slate-100'
            case 'canceled': return 'bg-red-100 text-red-800 hover:bg-red-100'
            default: return 'bg-gray-100 text-gray-800'
        }
    }


const handleCancelBooking = () => {
  Swal.fire({
    title: 'Cancel Booking?',
    text: 'Are you sure you want to cancel this booking?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, Cancel',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      // 👉 Call API here
    //   cancelBooking(bookingId);

      Swal.fire({
        title: 'Cancelled!',
        text: 'Booking has been cancelled.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });       
    }
  });
};

const handleIssueRefund = () => {
  Swal.fire({
    title: 'Issue Refund?',
    text: 'Do you want to issue a refund for this booking?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, Issue Refund',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // 👉 Call API here
    //   acceptBooking(bookingId);

      Swal.fire({
        title: 'Refunded!',
        text: 'Booking has been refunded.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });       
    }
  });
};


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl p-0 gap-0 max-h-[90vh] overflow-y-auto">
                <div className="px-6 pt-5 pb-4 border-b sticky top-0 bg-white z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-semibold">
                                Booking Details - {booking?.bookingId}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Complete booking information
                            </p>
                        </div>
                        <Badge
                            variant="outline"
                            className={`px-3 py-1 font-medium capitalize ${getStatusColor(booking?.status)}`}
                        >
                            {booking?.status}
                        </Badge>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-6 space-y-8">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Customer Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                    Name
                                </p>
                                <p className="font-medium">{booking?.customer?.name}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Email</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{booking?.customer?.email}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => copyToClipboard(booking?.customer?.email, 'customer-email')}
                                    >
                                        <Copy className="h-3.5 w-3.5" />
                                    </Button>
                                    {copiedField === 'customer-email' && (
                                        <span className="text-xs text-green-600">Copied</span>
                                    )}
                                </div>
                            </div>                            
                        </div>
                    </div>

                    {/* Host Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Host Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                    Name
                                </p>
                                <p className="font-medium">{booking?.host?.name}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Email</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{booking?.host?.email}</p>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => copyToClipboard(booking?.host?.email, 'host-email')}
                                    >
                                        <Copy className="h-3.5 w-3.5" />
                                    </Button>
                                    {copiedField === 'host-email' && (
                                        <span className="text-xs text-green-600">Copied</span>
                                    )}
                                </div>
                            </div>                            
                        </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Vehicle</h3>
                        <div className="flex items-start gap-6 p-4 border rounded-lg bg-muted/20">
                            <img 
                                src={booking?.vehicle?.image} 
                                alt={booking?.vehicle?.name}
                                className="w-32 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1 space-y-3">
                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                        Vehicle Name
                                    </p>
                                    <p className="font-medium text-lg">{booking?.vehicle?.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                        License Plate
                                    </p>
                                    <p className="font-medium">{booking?.vehicle?.plate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rental Period */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Rental Period</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                    Start Date
                                </p>
                                <p className="font-medium">{booking?.dates?.start}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                    End Date
                                </p>
                                <p className="font-medium">{booking?.dates?.end}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                    Duration
                                </p>
                                <p className="font-medium">{booking?.dates?.duration} days</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Pricing</h3>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-200 rounded-xl p-6">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-blue-800/90">
                                        ${booking?.pricing?.dailyRate}/day × {booking?.pricing?.days} days
                                    </p>
                                    <p className="text-lg font-semibold text-blue-700">
                                        ${booking?.pricing?.subtotal?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Financial Breakdown</h3>
                        <div className="border rounded-lg divide-y">
                            <div className="p-4 flex justify-between items-center">
                                <p className="font-medium">Subtotal:</p>
                                <p className="text-lg font-semibold">
                                    ${booking?.pricing?.subtotal?.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-red-50/50">
                                <p className="font-medium">
                                    Platform Fee ({booking?.pricing?.platformFeePercentage}%):
                                </p>
                                <p className="text-lg font-semibold text-red-600">
                                    -${booking?.pricing?.platformFee?.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 flex justify-between items-center bg-green-50">
                                <p className="font-bold text-lg">Host Earnings:</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ${booking?.pricing?.hostEarnings?.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Admin Override Actions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Admin Override Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button 
                                variant="secondary" 
                                size="lg"
                                className="border-black/50! border-2!"
                                onClick={() => {
                                    handleCancelBooking();
                                    onClose();
                                }}
                            >
                                Cancel Booking
                            </Button>

                            <Button 
                                
                                className=""
                                onClick={() => {
                                    handleIssueRefund();
                                    onClose();
                                }}
                            >
                                Issue Refund
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}