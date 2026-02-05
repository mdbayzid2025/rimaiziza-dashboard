
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Input } from '../../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';

import {
    Eye,
    Pencil,
    Plus,
    Search,
    SlidersHorizontal,
    Trash2,
} from 'lucide-react';

export default function AllVehicles() {
  const vehicles = [
    {
      id: 'V001',
      name: '2023 Mercedes E-Class',
      color: 'Black',
      mileage: '25,000 mi',
      plate: 'ABC-1234',
      price: 120,
      status: 'available',
      host: 'Sarah Miller',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop', // placeholder — replace with real
    },
    {
      id: 'V002',
      name: '2023 Mercedes E-Class',
      color: 'Black',
      mileage: '25,000 mi',
      plate: 'XYZ-5678',
      price: 180,
      status: 'booked',
      host: 'Mike Johnson',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
    },
    {
      id: 'V003',
      name: '2023 Mercedes E-Class',
      color: 'Black',
      mileage: '25,000 mi',
      plate: 'LMN-9012',
      price: 250,
      status: 'available',
      host: '—', // shows "Assign" button
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
    },
    {
      id: 'V004',
      name: '2023 Mercedes E-Class',
      color: 'Black',
      mileage: '25,000 mi',
      plate: 'DEF-3456',
      price: 80,
      status: 'rented',
      host: 'Sarah Miller',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
    },
    {
      id: 'V005',
      name: '2023 Mercedes E-Class',
      color: 'Black',
      mileage: '25,000 mi',
      plate: 'POR-9999',
      price: 500,
      status: 'available',
      host: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200';
      case 'booked':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200';
      case 'rented':
        return 'bg-rose-100 text-rose-800 hover:bg-rose-100 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">All Vehicles (5)</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  className="pl-9 bg-background"
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="w-16 pl-6">ID</TableHead>
                <TableHead className="w-80">Vehicle</TableHead>
                <TableHead className="w-36">License Plate</TableHead>
                <TableHead className="w-28 text-right">Price/Hour</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-44">Host</TableHead>
                <TableHead className="w-28 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {vehicles.map((v, index) => (
                <TableRow key={v.id} data-aos="fade-up" data-aos-delay={index * 100} className="hover:bg-muted/30 border-b last:border-0">
                  <TableCell className="pl-6 font-medium">{v.id}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-24 overflow-hidden rounded-md border bg-muted flex-shrink-0">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-medium leading-tight">{v.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {v.color} • {v.mileage}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-sm">{v.plate}</TableCell>

                  <TableCell className="text-right font-medium">
                    ${v.price}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusVariant(v.status)}`}
                    >
                      {v.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {v.host === '—' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 h-8 text-xs border-dashed"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Assign
                      </Button>
                    ) : (
                      <span className="text-sm">{v.host}</span>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="text-muted-foreground hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}