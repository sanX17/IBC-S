"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SubmitEntry() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
    biotopeName: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, category: value || "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="submit"
      className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-2xl mx-auto">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Submit Your Entry
            </h2>
            <p className="text-lg text-foreground/70">
              Ready to showcase your biotope? Fill out the form below to
              register.
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-8 bg-card border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-foreground font-semibold"
                >
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-foreground font-semibold"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-foreground font-semibold"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label
                  htmlFor="category"
                  className="text-foreground font-semibold"
                >
                  Aquarium Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nano">
                      Nano Aquarium (&lt;10L)
                    </SelectItem>
                    <SelectItem value="small">
                      Small Aquarium (10-30L)
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium Aquarium (30-60L)
                    </SelectItem>
                    <SelectItem value="large">
                      Large Aquarium (60-120L)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Biotope Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="biotopeName"
                  className="text-foreground font-semibold"
                >
                  Biotope Name/Location
                </Label>
                <Input
                  id="biotopeName"
                  name="biotopeName"
                  placeholder="e.g., Amazon River Basin, Lake Victoria"
                  value={formData.biotopeName}
                  onChange={handleInputChange}
                  required
                  className="bg-background border-border"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-foreground font-semibold"
                >
                  Biotope Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your biotope setup, species included, and inspiration..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="bg-background border-border resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full">
                Submit Entry
              </Button>

              <p className="text-sm text-foreground/60 text-center">
                Registration fee: ₹500 | You will receive confirmation at your
                email
              </p>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
