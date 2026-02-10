import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { imageUrl } from "../../../redux/base/baseAPI";
import { useCreateCarMutation } from "../../../redux/features/cars/carsApi";
import { MultipleImageUploader } from "../../Shared/MultipleImageUploader";
import { SingleImageUpload } from "../../Shared/SingleImageUpload";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { useGetHostsQuery } from "../../../redux/features/host/hostApi";

interface AddCarFormProps {
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  data?: any;
}

const FACILITIES = [
  { label: "Air Conditioning", value: "air_conditioning" },
  { label: "Bluetooth", value: "bluetooth" },
  { label: "GPS Navigation", value: "gps_navigation" },
  { label: "Reverse Camera", value: "reverse_camera" },
  { label: "USB Charger", value: "usb_charger" },
  { label: "Sunroof", value: "sunroof" },
  { label: "Parking Sensors", value: "parking_sensors" },
  { label: "Cruise Control", value: "cruise_control" },
];

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const HOURS = Array.from({ length: 24 }, (_, i) =>
  `${i.toString().padStart(2, "0")}:00`
);





export default function AddCarForm({ onCancel, data }: AddCarFormProps) {
  const [images, setImages] = useState<File[]>([]);

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(DAYS);
  const [selectedHours, setSelectedHours] = useState<string[]>(HOURS);
  const [image, setImage] = useState<File | null>(null)
  const [existCover, setExistCover] = useState("")    
  const [createCar] = useCreateCarMutation()
  const  {data: hostsData} = useGetHostsQuery({})

  useEffect(() => {
    if (data?.coverImage) {
      setExistCover(data?.coverImage);      
    }
  }, [data])

  const toggleFacility = (value: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleAllDays = () => {
    setSelectedDays((prev) => (prev.length === DAYS.length ? [] : DAYS));
  };

  const toggleAllHours = () => {
    setSelectedHours((prev) => (prev.length === HOURS.length ? [] : HOURS));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();

    // Build the payload object
    const payload = {
      brand: form.brand.value,
      model: form.model.value,
      year: parseInt(form.year.value),
      transmission: form.transmission.value,
      fuelType: form.fuelType.value,
      mileage: form.mileage.value,
      seatNumber: parseInt(form.seatNumber.value),
      depositAmount: parseFloat(form.depositAmount.value),
      color: form.color.value,
      assignedHosts: form.assignedHosts.value,
      about: form.about.value,
      shortDescription: form.shortDescription.value,
      licensePlate: form.licensePlate.value,
      dailyPrice: parseFloat(form.dailyPrice.value),
      hourlyPrice: parseFloat(form.hourlyPrice.value),
      minimumTripDuration: parseFloat(form.minimumTripDuration.value),
      withDriver: form.withDriver.value === "true",
      city: form.city.value,
      pickupPoint: {
        type: "Point",
        coordinates: [
          parseFloat(form.longitude.value),
          parseFloat(form.latitude.value),
        ],
      },
      availableDays: selectedDays,
      facilities: selectedFacilities.map((value) => {
        const facility = FACILITIES.find((f) => f.value === value);
        return { label: facility?.label || "", value };
      }),
      availableHours: selectedHours,
    };

    // Append JSON payload
    formData.append("data", JSON.stringify(payload));

    // Append cover image
    if (image) {
      formData.append("coverImage", image);
    }

    // Append multiple images
    images.forEach((image) => {
      formData.append("images", image);
    });


    try {
      const response = await createCar(formData)?.unwrap()

      console.log("create cart", response);
      
      if(response?.success){
        toast.success(response?.message)        
      }
    } catch (error:any) {
      console.log("error", error);
      toast.error(error?.data?.message)
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Image Upload */}

      <div className="flex items-center gap-6">
        <SingleImageUpload
          file={image}
          onChange={setImage}
          onRemove={() => setImage(null)}
          existingImage={existCover}
          title="Cover Image"
          height={200}
          cover          
        />
      </div>

      <div className="flex items-center gap-6">
        <MultipleImageUploader
          files={images}
          onChange={setImages}
          onRemove={(index) => {
            const updated = [...images]
            updated.splice(index, 1)
            setImages(updated)
          }}
          existingImages={data?.images?.map(
            (img: string) => `${imageUrl}${img}`
          )}
          title="Gallery Images"
          height={180}
          width="100%"
          maxImages={8}          
        />
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              name="brand"
              placeholder="Toyota"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              name="model"
              placeholder="Corolla"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="2021"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              name="color"
              placeholder="White"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              name="licensePlate"
              placeholder="DHAKA-KHA-1352"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seatNumber">Number of Seats</Label>
            <Input
              id="seatNumber"
              name="seatNumber"
              type="number"
              min="0"
              max="50"
              placeholder="5"
              className="bg-white h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transmission">Transmission</Label>
            <select
              id="transmission"
              name="transmission"
              className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select transmission</option>
              <option value="AUTOMATIC">Automatic</option>
              <option value="MANUAL">Manual</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fuelType">Fuel Type</Label>
            <select
              id="fuelType"
              name="fuelType"
              className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select fuel type</option>
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="ELECTRIC">Electric</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage</Label>
            <Input
              id="mileage"
              name="mileage"
              placeholder="18 km/l"
              className="bg-white h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Pricing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dailyPrice">Daily Price (BDT)</Label>
            <Input
              id="dailyPrice"
              name="dailyPrice"
              type="number"
              step="0.01"
              placeholder="2500"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hourlyPrice">Hourly Price (BDT)</Label>
            <Input
              id="hourlyPrice"
              name="hourlyPrice"
              type="number"
              step="0.01"
              placeholder="300"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="depositAmount">Deposit Amount (BDT)</Label>
            <Input
              id="depositAmount"
              name="depositAmount"
              type="number"
              step="0.01"
              placeholder="100"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minimumTripDuration">
              Minimum Trip Duration (hours)
            </Label>
            <Input
              id="minimumTripDuration"
              name="minimumTripDuration"
              type="number"
              step="0.5"
              placeholder="2"
              className="bg-white h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Location & Assignment */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Location & Assignment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Dhaka"
              className="bg-white h-11"
              required
            />
          </div>
            <div className="space-y-2">
            <Label htmlFor="assignedHosts">Assign Hoster</Label>
            <select
              id="assignedHosts"
              name="assignedHosts"
              className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Hoster</option>
              {hostsData?.map((host:any)=><option value={host?._id}>{host?.name}</option>)}              
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="latitude">Pickup Latitude</Label>
            <Input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              placeholder="23.8103"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Pickup Longitude</Label>
            <Input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              placeholder="90.4125"
              className="bg-white h-11"
              required
            />
          </div>
        </div>
      </div>

      {/* Driver Option */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Driver Option
        </h3>
        <div className="space-y-2">
          <Label htmlFor="withDriver">Available With Driver</Label>
          <select
            id="withDriver"
            name="withDriver"
            className="w-full h-11 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      {/* Facilities */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Facilities
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FACILITIES.map((facility) => (
            <label
              key={facility.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFacilities.includes(facility.value)}
                onChange={() => toggleFacility(facility.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{facility.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Available Days */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">
            Available Days
          </h3>
          <button
            type="button"
            onClick={toggleAllDays}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {selectedDays.length === DAYS.length ? "Deselect All" : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DAYS.map((day) => (
            <label key={day} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 capitalize">
                {day.toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Available Hours */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-800 uppercase">
            Available Hours
          </h3>
          <button
            type="button"
            onClick={toggleAllHours}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {selectedHours.length === HOURS.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-md">
          {HOURS.map((hour) => (
            <label key={hour} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedHours.includes(hour)}
                onChange={() =>
                  setSelectedHours((prev) =>
                    prev.includes(hour)
                      ? prev.filter((h) => h !== hour)
                      : [...prev, hour]
                  )
                }
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{hour}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Descriptions
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              placeholder="Clean, comfortable, fuel-efficient."
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">Full Description</Label>
            <Textarea
              id="about"
              name="about"
              placeholder="A well-maintained family sedan with excellent comfort..."
              rows={6}
              className="bg-white resize-none"
              required
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="text-gray-700 bg-transparent border-2! border-gray-200! hover:bg-gray-50"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="lg"
          className=""
        >
          <Car className="w-4 h-4 mr-2" />
          Add Car
        </Button>
      </div>
    </form>
  );
}