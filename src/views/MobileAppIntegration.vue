<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Mobile App Integration"
      description="Connect and manage your farm through our mobile application"
    />

    <h1 class="text-2xl font-bold hidden md:block">
      Mobile App & Smart Alerts
    </h1>

    <div class="grid lg:grid-cols-1 gap-8 mb-10">
      <Card class="hidden md:block md:py-4">
        <MobileMockup />
      </Card>

      <div class="lg:col-span-2">
        <h2 class="text-2xl font-semibold mb-4">Mobile App Features</h2>
        <Card>
          <CardHeader>
            <CardTitle class="font-semibold text-lg mb-2">
              Smart Farming at Your Fingertips</CardTitle
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"
              >
                <LayoutDashboard class="text-xl" />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">Real-time Dashboard</h3>
                <p class="text-zinc-600">
                  Monitor all your farm's vital statistics in real-time from
                  anywhere. Get instant updates on soil moisture, irrigation
                  status, and environmental conditions.
                </p>
              </div>
            </div>

            <Separator />

            <div class="flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"
              >
                <BellRing class="text-xl" />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">Smart Notifications</h3>
                <p class="text-zinc-600">
                  Receive instant alerts for critical events like low moisture
                  levels, equipment failures, or extreme weather conditions.
                  Customize notification preferences based on urgency.
                </p>
              </div>
            </div>

            <Separator />

            <div class="flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"
              >
                <Cog class="text-xl" />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">Remote Control</h3>
                <p class="text-zinc-600">
                  Manually override irrigation systems, adjust settings, and
                  control farm equipment directly from your smartphone. Schedule
                  operations in advance or make real-time adjustments.
                </p>
              </div>
            </div>

            <Separator />

            <div class="flex gap-4">
              <div
                class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"
              >
                <ChartArea class="text-xl" />
              </div>
              <div>
                <h3 class="text-lg font-semibold mb-2">Analytics & Reports</h3>
                <p class="text-zinc-600">
                  Access detailed analytics and historical data to track
                  performance over time. Generate custom reports on water usage,
                  crop health, and system efficiency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <h2 class="text-2xl font-semibold mb-4">Download the App</h2>
    <Card>
      <CardHeader>
        <CardDescription>
          Download our mobile app to access your smart farming system on the go.
          Available for iOS and Android devices.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap justify-center gap-4">
          <Button variant="empty">
            <img
              src="@/assets/appstore.png"
              alt="Google Play"
              class="w-36 h-auto"
            />
          </Button>
          <Button variant="empty">
            <img
              src="@/assets/googleplay.png"
              alt="Google Play"
              class="w-36 h-auto"
            />
          </Button>
        </div>
      </CardContent>
    </Card>

    <h2 class="text-2xl font-semibold mb-4">How to Connect</h2>
    <Card>
      <CardHeader class="p-3" />
      <CardContent>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent class="pt-6">
              <div
                class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-4 font-bold"
              >
                1
              </div>
              <h3 class="text-lg font-semibold mb-2">Download the App</h3>
              <p class="text-zinc-600">
                Get the LeaveLet mobile app from the App Store or Google Play
                Store.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div
                class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-4 font-bold"
              >
                2
              </div>
              <h3 class="text-lg font-semibold mb-2">Create an Account</h3>
              <p class="text-zinc-600">
                Sign up with your email or use your existing LeaveLet account
                credentials.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div
                class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-4 font-bold"
              >
                3
              </div>
              <h3 class="text-lg font-semibold mb-2">Scan QR Code</h3>
              <p class="text-zinc-600">
                Scan this unique QR code to link your mobile app to your farm
                system.
              </p>
              <div class="flex justify-center mt-4">
                <img
                  src="@/assets/qrcode.png"
                  alt="QR Code"
                  class="w-24 h-24 rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="pt-6">
              <div
                class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-4 font-bold"
              >
                4
              </div>
              <h3 class="text-lg font-semibold mb-2">Set Preferences</h3>
              <p class="text-zinc-600">
                Customize your notification settings and dashboard layout
                according to your needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BellRing,
  ChartArea,
  Cog,
  Image,
  LayoutDashboard,
} from "lucide-vue-next";
import MobileMockup from "@/components/MobileMockup.vue";
</script>
