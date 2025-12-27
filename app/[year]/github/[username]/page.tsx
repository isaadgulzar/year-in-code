import { redirect } from 'next/navigation'

interface GitHubPageProps {
  params: Promise<{
    year: string
    username: string
  }>
}

export default async function GitHubPage({ params }: GitHubPageProps) {
  const { year, username } = await params

  // Redirect to report page with GitHub tab and username as query params
  redirect(`/${year}/report?tab=github&username=${username}`)
}
