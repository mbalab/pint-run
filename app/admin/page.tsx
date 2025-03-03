import { Suspense } from "react"
import { DataManager } from "@/lib/data-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

async function AdminStats() {
  const dataManager = await DataManager.getInstance()
  const regions = await dataManager.getRegions()

  const stats = {
    totalRegions: regions.length,
    totalCounties: regions.reduce((acc, r) => acc + r.counties.length, 0),
    totalPubs: regions.reduce((acc, r) => acc + r.totalPubs, 0),
    lastUpdated: regions.reduce((latest, r) => (latest > r.lastUpdated ? latest : r.lastUpdated), ""),
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRegions}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Counties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCounties}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pubs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPubs}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">{new Date(stats.lastUpdated).toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminPage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Trigger Update
        </Button>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <AdminStats />
      </Suspense>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Data Update</p>
                  <p className="text-sm text-muted-foreground">March 2, 2025 17:34</p>
                </div>
                <Badge variant="success">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">Data Update</p>
                  <p className="text-sm text-muted-foreground">March 1, 2025 12:15</p>
                </div>
                <Badge variant="destructive">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Failed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

