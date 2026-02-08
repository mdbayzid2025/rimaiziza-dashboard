import React, { useState } from 'react'

import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { FileText, Loader2, Save } from 'lucide-react';
import { Textarea } from '../../ui/textarea';

// Terms & Conditions State

const initData = {
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
}


const TermsCondition = () => {
    const [isEditingTerms, setIsEditingTerms] = useState(false);
    const [loading, setLoading] = useState(false)
    const [termsSettings, setTermsSettings] = useState(initData);

    const handleSaveTerms = async () => {
        setLoading(true);
        console.log("Saving terms:", termsSettings);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsEditingTerms(false);
        setLoading(false);
    };
    return (
        <Card className="border-none shadow-sm max-w-6xl mx-auto">
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
                                className="min-h-100 font-mono text-sm"
                            />
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleSaveTerms}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    {loading ? (
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
                                    disabled={loading}
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
    )
}

export default TermsCondition