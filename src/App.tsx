import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { API_BASE_URL } from '@/lib/constants'

// Example interface - replace with your own data models
interface ExampleData {
  id: string
  message: string
  timestamp: string
}

export default function App() {
  // State management examples
  const [data, setData] = useState<ExampleData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [inputValue, setInputValue] = useState('')

  // Example API call function
  const fetchData = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Example API call - replace with your actual endpoint
      const response = await fetch(`${API_BASE_URL}/api/v1/example`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Example form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim()) {
      setError('Please enter a value')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Example POST request - replace with your actual endpoint
      const response = await fetch(`${API_BASE_URL}/api/v1/example`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          value: inputValue 
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setInputValue('') // Clear input on success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          {/* Example Card Component */}
          <Card>
            <CardHeader>
              <CardTitle>Example Application</CardTitle>
              <CardDescription>
                This is a template showing common patterns and component usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Example Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="example-input">Example Input</Label>
                  <Input
                    id="example-input"
                    type="text"
                    placeholder="Enter something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={loading}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fetchData}
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Fetch Data
                  </Button>
                </div>
              </form>

              {/* Error Display */}
              {error && (
                <div className="rounded-lg bg-destructive/10 p-4">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Data Display */}
              {data && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <h3 className="font-semibold">Response Data:</h3>
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Example Components */}
          <Card>
            <CardHeader>
              <CardTitle>Component Examples</CardTitle>
              <CardDescription>
                Browse the components directory for more UI components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This template includes a comprehensive set of UI components from shadcn/ui.
                Check the <code className="bg-muted px-1 py-0.5 rounded">components/ui</code> directory
                for buttons, forms, dialogs, and more.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}