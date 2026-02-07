
import { Loader2, Save, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

const PersonalInformation = () => {
  const [loading, setLoading] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    name: "Samuel Johnson",
    supportEmail: "support@courierexpress.com",
    supportPhone: "+1 (800) 123-4567",
    address: "",
  });

  // Profile photo states
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingProfileUrl] = useState<string | null>(
    
  );

  // ── react-dropzone configuration ───────────────────────────────
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    onDropRejected: (fileRejections) => {
      if (fileRejections.length > 0) {
        const error = fileRejections[0].errors[0];
        if (error.code === 'file-too-large') {
          alert('File is too large. Maximum size is 5MB.');
        } else if (error.code === 'file-invalid-type') {
          alert('Only JPG, PNG and WebP images are allowed.');
        } else {
          alert('File rejected: ' + error.message);
        }
      }
    },
  });

  const displayImage = profilePreview || existingProfileUrl;

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering dropzone click
    setProfilePreview(null);
    setSelectedFile(null);
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      // ── Prepare data to send ───────────────────────────────
      console.log('General settings:', generalSettings);

      if (selectedFile) {
        console.log('New profile photo selected → should be uploaded');
        // In real app:
        // const formData = new FormData();
        // formData.append('profilePhoto', selectedFile);
        // formData.append('name', generalSettings.name);
        // ... axios.post('/api/profile', formData)
      } else {
        console.log('No new photo selected');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1400));

      // After successful save you might:
      // setExistingProfileUrl(newUrlFromServer);
      // setProfilePreview(null);
      // setSelectedFile(null);

      alert('Settings saved successfully! (mock save)');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-sm w-full max-w-6xl mx-auto">
      <CardContent className="px-6 sm:px-8 py-8 ">
        <div className="flex gap-10 lg:gap-12">
          {/* ── Profile Photo Section ── */}
          <div className="flex flex-col items-center md:items-start gap-6 order-1 md:order-none">
            <h2 className="text-2xl font-bold md:hidden mb-2">Profile Photo</h2>

            <div className=" w-full mx-auto max-w-70 md:mx-0">
              <div
                {...getRootProps()}
                className={cn(
                  "group relative border-2 border-dashed rounded-2xl p-4 transition-all duration-200",
                  "hover:border-primary/60 hover:bg-muted/40",
                  isDragActive
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 scale-[1.015]"
                    : "border-border/60",
                  "cursor-pointer flex flex-col items-center justify-center text-center min-h-[260px] sm:min-h-[280px]"
                )}
              >
                <input {...getInputProps()} />

                {displayImage ? (
                  <div className="relative w-60">
                    <Avatar className="h-full w-full rounded-lg! border-4 border-background shadow-lg">
                      <AvatarImage src={displayImage} alt="Profile photo" />
                      <AvatarFallback className="bg-muted text-muted-foreground text-6xl">
                        <User className="h-full w-full" />
                      </AvatarFallback>
                    </Avatar>

                    <Button
                      size="icon"
                    //   variant="destructive"
                      className="absolute -top-3 -right-3 h-7 w-7 rounded-full shadow-md"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-full bg-muted/60 p-5 mb-4 group-hover:bg-muted/80 transition-colors">
                      <User className="h-10 w-10 text-muted-foreground group-hover:text-primary/80 transition-colors" />
                    </div>
                    <p className="text-base font-medium mb-1.5">
                      {isDragActive ? "Drop your photo here" : "Drag & drop your photo here"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      JPG, PNG, WebP • Max 5 MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── General Settings Form ── */}
          <div className="space-y-7 order-2 md:order-none flex-1">
            <h2 className="text-2xl font-bold">General Information</h2>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={generalSettings.name}
                  onChange={(e:any) =>
                    setGeneralSettings((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="h-11"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e:any) =>
                    setGeneralSettings((prev) => ({ ...prev, supportEmail: e.target.value }))
                  }
                  className="h-11"
                />
              </div>              
            </div>

            <div className="pt-2">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-8 min-w-[160px]"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;