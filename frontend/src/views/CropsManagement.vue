<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ref, computed, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Pencil, Trash2, Plus, Calendar, AlertCircle, Leaf } from "lucide-vue-next";

// Default crops
const defaultCrops = [
  { id: 1, name: "Corn", type: "Grain", plantingSeason: "Spring", harvestDays: 90, status: "Active" },
  { id: 2, name: "Soybeans", type: "Legume", plantingSeason: "Spring", harvestDays: 120, status: "Active" },
  { id: 3, name: "Wheat", type: "Grain", plantingSeason: "Fall/Spring", harvestDays: 110, status: "Active" },
  { id: 4, name: "Tomatoes", type: "Vegetable", plantingSeason: "Spring", harvestDays: 80, status: "Active" },
  { id: 5, name: "Lettuce", type: "Vegetable", plantingSeason: "Spring/Fall", harvestDays: 60, status: "Active" }
];

// Define reactive variables
const crops = ref([...defaultCrops]);
const dialogOpen = ref(false);
const editingCrop = ref(null);
const activeTab = ref("all");

// Form model for new/edit crop
const cropForm = ref({
  id: null,
  name: "",
  type: "",
  plantingSeason: "",
  harvestDays: "",
  status: "Active"
});

const router = useRouter();

// Filter crops based on active tab
const filteredCrops = computed(() => {
  if (activeTab.value === "all") {
    return crops.value;
  } else {
    return crops.value.filter(crop => crop.type.toLowerCase() === activeTab.value);
  }
});

// Open dialog for adding a new crop
function openAddDialog() {
  editingCrop.value = null;
  cropForm.value = {
    id: crops.value.length > 0 ? Math.max(...crops.value.map(crop => crop.id)) + 1 : 1,
    name: "",
    type: "",
    plantingSeason: "",
    harvestDays: "",
    status: "Active"
  };
  dialogOpen.value = true;
}

// Open dialog for editing an existing crop
function openEditDialog(crop) {
  editingCrop.value = crop;
  cropForm.value = { ...crop };
  dialogOpen.value = true;
}

// Save crop (add new or update existing)
function saveCrop() {
  if (editingCrop.value) {
    // Update existing crop
    const index = crops.value.findIndex(c => c.id === editingCrop.value.id);
    if (index !== -1) {
      crops.value[index] = { ...cropForm.value };
    }
  } else {
    // Add new crop
    crops.value.push({ ...cropForm.value });
  }
  
  dialogOpen.value = false;
}

// Delete a crop
function deleteCrop(id) {
  if (confirm("Are you sure you want to delete this crop?")) {
    crops.value = crops.value.filter(crop => crop.id !== id);
  }
}

// View crop details in the Crop Yield Forecasting page
function viewCropDetails(id) {
  router.push({
    path: '/crop-yield-forecasting',
    query: { crop: id }
  });
}

// Reset to default crops
function resetCrops() {
  if (confirm("This will reset all crops to default settings. Continue?")) {
    crops.value = [...defaultCrops];
  }
}
</script>

<template>
  <div class="flex-1 w-full space-y-8">
    <HeaderPage
      title="Crops Management"
      description="Register and manage crops for yield forecasting and monitoring"
    />

    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-semibold">Registered Crops</h2>
        <p class="text-muted-foreground">Manage crop types for your farm</p>
      </div>
      <div class="flex gap-2">
        <Button variant="outline" @click="resetCrops">Reset to Default</Button>
        <Button @click="openAddDialog">
          <Plus class="mr-2 h-4 w-4" />
          Add New Crop
        </Button>
      </div>
    </div>

    <!-- Tabs for filtering crops -->
    <Tabs v-model="activeTab" default-value="all" class="w-full">
      <TabsList class="mb-6">
        <TabsTrigger value="all">All Crops</TabsTrigger>
        <TabsTrigger value="grain">Grains</TabsTrigger>
        <TabsTrigger value="legume">Legumes</TabsTrigger>
        <TabsTrigger value="vegetable">Vegetables</TabsTrigger>
        <TabsTrigger value="fruit">Fruits</TabsTrigger>
      </TabsList>
    </Tabs>

    <!-- Crop Table -->
    <Card>
      <CardContent class="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Planting Season</TableHead>
              <TableHead>Days to Harvest</TableHead>
              <TableHead>Status</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="crop in filteredCrops" :key="crop.id">
              <TableCell class="font-medium">{{ crop.name }}</TableCell>
              <TableCell>{{ crop.type }}</TableCell>
              <TableCell>{{ crop.plantingSeason }}</TableCell>
              <TableCell>{{ crop.harvestDays }}</TableCell>
              <TableCell>
                <Badge 
                  :variant="crop.status === 'Active' ? 'default' : 'secondary'"
                >
                  {{ crop.status }}
                </Badge>
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" @click="viewCropDetails(crop.id)" title="View in Forecasting">
                    <Leaf class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="openEditDialog(crop)" title="Edit">
                    <Pencil class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" @click="deleteCrop(crop.id)" title="Delete">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow v-if="filteredCrops.length === 0">
              <TableCell colspan="6" class="text-center py-6 text-muted-foreground">
                No crops found. Add a new crop to get started.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center gap-4">
            <div class="p-2 h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Leaf class="h-6 w-6" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Total Crops</p>
              <p class="text-2xl font-bold">{{ crops.length }}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center gap-4">
            <div class="p-2 h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Calendar class="h-6 w-6" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Average Growth Cycle</p>
              <p class="text-2xl font-bold">
                {{ Math.round(crops.reduce((sum, crop) => sum + parseInt(crop.harvestDays), 0) / crops.length) }} days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center gap-4">
            <div class="p-2 h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <AlertCircle class="h-6 w-6" />
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Status</p>
              <p class="text-2xl font-bold">
                {{ crops.filter(c => c.status === 'Active').length }}/{{ crops.length }} Active
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Add/Edit Crop Dialog -->
    <Dialog v-model:open="dialogOpen">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{{ editingCrop ? 'Edit Crop' : 'Add New Crop' }}</DialogTitle>
          <DialogDescription>
            {{ editingCrop ? 'Update crop information in the system' : 'Register a new crop in the system' }}
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="name" class="text-right">Name</label>
            <Input id="name" v-model="cropForm.name" class="col-span-3" placeholder="Enter crop name" />
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="type" class="text-right">Type</label>
            <Select v-model="cropForm.type" class="col-span-3">
              <SelectTrigger id="type">
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Grain">Grain</SelectItem>
                <SelectItem value="Legume">Legume</SelectItem>
                <SelectItem value="Vegetable">Vegetable</SelectItem>
                <SelectItem value="Fruit">Fruit</SelectItem>
                <SelectItem value="Root">Root</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="season" class="text-right">Planting Season</label>
            <Select v-model="cropForm.plantingSeason" class="col-span-3">
              <SelectTrigger id="season">
                <SelectValue placeholder="Select planting season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
                <SelectItem value="Winter">Winter</SelectItem>
                <SelectItem value="Spring/Fall">Spring/Fall</SelectItem>
                <SelectItem value="Year-round">Year-round</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="harvestDays" class="text-right">Days to Harvest</label>
            <Input
              id="harvestDays"
              v-model="cropForm.harvestDays"
              type="number"
              class="col-span-3"
              placeholder="Enter days to harvest"
            />
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <label for="status" class="text-right">Status</label>
            <Select v-model="cropForm.status" class="col-span-3">
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" @click="dialogOpen = false">Cancel</Button>
          <Button @click="saveCrop">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>