import Link from 'next/link'

export default function SideDashboardNav (): JSX.Element {
  return (
    <div>
      <ul>
        <li><Link href={'#'}>Example Link</Link></li>
        <li><Link href={'#'}>Example Link</Link></li>
        <li><Link href={'#'}>Example Link</Link></li>
        <li><Link href={'#'}>Example Link</Link></li>
      </ul>
    </div>
  )
}
