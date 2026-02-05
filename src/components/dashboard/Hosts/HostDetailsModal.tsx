// components/host/HostDetailsModal.tsx
import { Copy } from "lucide-react"
import { useState } from 'react'
import { Badge } from "../../ui/badge"
import { Button } from "../../ui/button"
import {
    Dialog,
    DialogContent,
    DialogTitle
} from "../../ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"

interface HostDetailsModalProps {
    open: boolean
    onClose: () => void
    host: {
        name: string
        totalEarnings: number
        totalBookings: number
        rating: number
        membershipId: string
        email: string
        password: string
        phone: string
        address: string
        status: 'active' | 'inactive' | 'pending'
        assignedDate: string
        vehicles: Array<{
            id: string
            name: string
            plate: string
            status: 'available' | 'booked' | 'rented' | 'maintenance'
        }>
    }
}

export default function HostDetailsModal({ open, onClose, host }: HostDetailsModalProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null)

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
    }

    console.log("host", host?.vehicles?.length);
    

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'available': return 'bg-green-100 text-green-800 hover:bg-green-100'
            case 'booked': return 'bg-amber-100 text-amber-800 hover:bg-amber-100'
            case 'rented': return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
            case 'maintenance': return 'bg-red-100 text-red-800 hover:bg-red-100'
            case 'active': return 'bg-green-100 text-green-800 border-green-300'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl p-0 gap-0">
                <div className="px-6 pt-5 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-semibold">
                                Host Details - {host?.name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Complete host information and assigned vehicles
                            </p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="information" className="w-full">
                    <div className="px-6 pt-4 border-b bg-muted/30">
                        <TabsList className="grid w-full max-w-[400px] grid-cols-2 gap-5 ">
                            <TabsTrigger className=" bg-gray-300! text-gray-600
                            data-[state=active]:bg-primary!
                            data-[state=active]:text-white!
                            data-[state=active]:shadow-md!
                            transition-all" value="information">Information</TabsTrigger>
                            <TabsTrigger className=" bg-gray-300! text-gray-600
                            data-[state=active]:bg-primary!
                            data-[state=active]:text-white!
                            data-[state=active]:shadow-md!
                            transition-all" value="vehicles">Assigned Vehicles</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* ──────────────────────────────────────── */}
                    {/* TAB 1: INFORMATION                      */}
                    {/* ──────────────────────────────────────── */}
                    <TabsContent value="information" className="px-6 pb-6 pt-6 space-y-8">
                        {/* Stats cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gradient-to-br from-green-50 to-green-100/40 border border-green-200 rounded-xl p-5">
                                <p className="text-sm font-medium text-green-800/90 mb-1">Total Earnings</p>
                                <p className="text-3xl font-bold text-green-700">
                                    ${host?.totalEarnings?.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100/40 border border-blue-200 rounded-xl p-5">
                                <p className="text-sm font-medium text-blue-800/90 mb-1">Total Bookings</p>
                                <p className="text-3xl font-bold text-blue-700">{host?.totalBookings}</p>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200 rounded-xl p-5">
                                <p className="text-sm font-medium text-amber-800/90 mb-1">Rating</p>
                                <p className="text-3xl font-bold text-amber-700 flex items-center gap-2">
                                    <span>★</span> {host?.rating?.toFixed(1)}
                                </p>
                            </div>
                        </div>

                        {/* Personal & account info */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                        Membership ID
                                    </p>
                                    <p className="font-medium">{host?.membershipId}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Email</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{host?.email}</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => copyToClipboard(host?.email, 'email')}
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                        {copiedField === 'email' && (
                                            <span className="text-xs text-green-600">Copied</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Password</p>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{host?.password}</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() => copyToClipboard(host?.password, 'password')}
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                        {copiedField === 'password' && (
                                            <span className="text-xs text-green-600">Copied</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Phone</p>
                                    <p className="font-medium">{host?.phone}</p>
                                </div>

                                <div>
                                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Address</p>
                                    <p className="font-medium">{host?.address}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Status</p>
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 font-medium capitalize ${getStatusColor(host?.status)}`}
                                        >
                                            {host?.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                                            Assigned Date
                                        </p>
                                        <p className="font-medium">{host?.assignedDate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ──────────────────────────────────────── */}
                    {/* TAB 2: ASSIGNED VEHICLES                */}
                    {/* ──────────────────────────────────────── */}
                    <TabsContent value="vehicles" className="px-6 pb-8 pt-6">
                        <div className="space-y-4">
                            {host?.vehicles?.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No vehicles assigned to this host yet.
                                </div>
                            ) : (
                                host?.vehicles?.length !== 0 ? host?.vehicles?.map((vehicle) => (
                                    <div
                                        key={vehicle.id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/40 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-medium">{vehicle?.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                ID: {vehicle?.id} • Plate: {vehicle?.plate}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`px-3 py-1 font-medium capitalize ${getStatusColor(vehicle?.status)}`}
                                        >
                                            {vehicle?.status}
                                        </Badge>
                                    </div>
                                )) : <div className="text-center py-12 text-muted-foreground">
                                    No vehicles assigned to this host yet.
                                </div>)}

                            {host?.vehicles?.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No vehicles assigned to this host yet.
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}