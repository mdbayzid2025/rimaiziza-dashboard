// pages/settings/SettingsPage.tsx
import { DollarSign, Eye, EyeOff, FileText, Globe, Loader2, Save, Shield } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";
import CommissionManage from "./CommissionManage";
import PersonnalInformation from "./PersonnalInformation";

export default function Setting() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);

    const [isSaving, setIsSaving] = useState(false);



    // Security State
    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Terms & Conditions State
    const [termsSettings, setTermsSettings] = useState({
        content: `We value your privacy and are committed to protecting your personal information.

Information We Collect: When you create an account, we may collect your name, email, location, and details you choose to share about your child (such as age, diagnosis, and interests).

How We Use It: This information is used only to help connect you with other parents, improve our services, and ensure a safe community.

Data Sharing: We do not sell or share your personal data with third parties for marketing. Data is only shared if required by law or to protect community safety.

Security: Your data is encrypted and stored securely. We take all reasonable steps to protect it from unauthorized access.

Your Control: You can update or delete your profile at any time through the app settings.

By using this app, you agree to this Privacy Policy. If you have any questions, please contact us at [support@email.com].`,
        lastUpdated: "5/1/2024",
        updatedBy: "Admin",
        status: "published"
    });

    // Privacy Policy State
    const [privacySettings, setPrivacySettings] = useState({
        content: `We value your privacy and are committed to protecting your personal information.

Information We Collect: When you create an account, we may collect your name, email, location, and details you choose to share about your child (such as age, diagnosis, and interests).

How We Use It: This information is used only to help connect you with other parents, improve our services, and ensure a safe community.

Data Sharing: We do not sell or share your personal data with third parties for marketing. Data is only shared if required by law or to protect community safety.

Security: Your data is encrypted and stored securely. We take all reasonable steps to protect it from unauthorized access.

Your Control: You can update or delete your profile at any time through the app settings.

By using this app, you agree to this Privacy Policy. If you have any questions, please contact us at [support@email.com].`,
        lastUpdated: "5/1/2024",
        updatedBy: "Admin",
        status: "published"
    });

    const [isEditingTerms, setIsEditingTerms] = useState(false);
    const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);



    const handleUpdatePassword = async () => {
        setIsSaving(true);
        console.log("Updating password");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const handleSaveTerms = async () => {
        setIsSaving(true);
        console.log("Saving terms:", termsSettings);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsEditingTerms(false);
        setIsSaving(false);
    };

    const handleSavePrivacy = async () => {
        setIsSaving(true);
        console.log("Saving privacy policy:", privacySettings);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsEditingPrivacy(false);
        setIsSaving(false);
    };

    return (
        <div className="p-5">
            <Tabs defaultValue="general" className="w-full h-24!">
                <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border">
                    <h1 className="text-2xl! font-bold pb-1">Admin Settings</h1>
                    <p className="text-secondary mb-5">Super Admin</p>
                    <TabsList className="grid w-full h-16! bg-primary/20 grid-cols-5 gap-5 p-2!">
                        <TabsTrigger
                            className="bg-gray-300 text-gray-600! 
                                  data-[state=active]:bg-primary!
                                  data-[state=active]:text-white!
                                    data-[state=active]:shadow-md!                                    
                                    data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none!                                                                                                                      
                                    transition-all"
                            value="general"
                        >
                            <Globe className="h-4 w-4 mr-2" />
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger
                            className="bg-gray-300 text-gray-600
                                  data-[state=active]:bg-primary!
                                data-[state=active]:text-white!
                                  data-[state=active]:shadow-md!
                                   data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none! 
                                transition-all"
                            value="pricing"
                        >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pricing & Fees
                        </TabsTrigger>
                        <TabsTrigger                        
                            className="bg-gray-300 text-gray-600
                                  data-[state=active]:bg-primary!
                                  data-[state=active]:text-white!
                                    data-[state=active]:shadow-md!
                                     data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none! 
                                    transition-all!"
                            value="security"
                        >
                            <Shield className="h-4 w-4 mr-2" />
                            Security
                        </TabsTrigger>
                        <TabsTrigger
                            className="bg-gray-300 text-gray-600
                                  data-[state=active]:bg-primary!
                            data-[state=active]:text-white!
                            data-[state=active]:shadow-md!
                             data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none! 
                                transition-all"
                            value="terms"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Term and Condition
                        </TabsTrigger>
                        <TabsTrigger
                            className="bg-gray-300 text-gray-600
                                  data-[state=active]:bg-primary!
                            data-[state=active]:text-white!
                            data-[state=active]:shadow-md!
                             data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none! 
                                transition-all"
                            value="privacy"
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Privacy Policy
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* General Settings Tab */}
                <TabsContent value="general">
                    <PersonnalInformation />
                </TabsContent>

                {/* Pricing & Fees Tab */}
                <TabsContent value="pricing">
                    <CommissionManage />
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security">
                    <Card className="border-none shadow-sm w-full max-w-6xl mx-auto">
                        <CardContent className="px-8 pb-8">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">Security Settings</h2>

                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={securitySettings.currentPassword}
                                            onChange={(e) => setSecuritySettings({ ...securitySettings, currentPassword: e.target.value })}
                                            className="h-12 pr-12"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={securitySettings.newPassword}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, newPassword: e.target.value })}
                                        className="h-12"
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={securitySettings.confirmPassword}
                                        onChange={(e) => setSecuritySettings({ ...securitySettings, confirmPassword: e.target.value })}
                                        className="h-12"
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <Button
                                    onClick={handleUpdatePassword}
                                    disabled={isSaving}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Update
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Terms & Conditions Tab */}
                <TabsContent value="terms">
                    <Card className="border-none shadow-sm">
                        <CardContent className="px-8 pb-8">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">Term & Condition</h2>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <span>Last updated: {termsSettings.lastUpdated}</span>
                                            <span>By: {termsSettings.updatedBy}</span>
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                Published
                                            </Badge>
                                        </div>
                                    </div>
                                    {!isEditingTerms && (
                                        <Button
                                            onClick={() => setIsEditingTerms(true)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            <FileText className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                    )}
                                </div>

                                {isEditingTerms ? (
                                    <>
                                        <Textarea
                                            value={termsSettings.content}
                                            onChange={(e) => setTermsSettings({ ...termsSettings, content: e.target.value })}
                                            className="min-h-[400px] font-mono text-sm"
                                        />
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handleSaveTerms}
                                                disabled={isSaving}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => setIsEditingTerms(false)}
                                                variant="outline"
                                                disabled={isSaving}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                            {termsSettings.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Privacy Policy Tab */}
                <TabsContent value="privacy">
                    <Card className="border-none shadow-sm">
                        <CardContent className="px-8 pb-8">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">Privacy Policy</h2>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            <span>Last updated: {privacySettings.lastUpdated}</span>
                                            <span>By: {privacySettings.updatedBy}</span>
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                Published
                                            </Badge>
                                        </div>
                                    </div>
                                    {!isEditingPrivacy && (
                                        <Button
                                            onClick={() => setIsEditingPrivacy(true)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            <FileText className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                    )}
                                </div>

                                {isEditingPrivacy ? (
                                    <>
                                        <Textarea
                                            value={privacySettings.content}
                                            onChange={(e) => setPrivacySettings({ ...privacySettings, content: e.target.value })}
                                            className="min-h-[400px] font-mono text-sm"
                                        />
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handleSavePrivacy}
                                                disabled={isSaving}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => setIsEditingPrivacy(false)}
                                                variant="outline"
                                                disabled={isSaving}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                            {privacySettings.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}