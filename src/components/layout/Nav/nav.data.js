import Logo from '@/assets/images/logo.svg'
import Search from '@/assets/images/search.svg'
import Store from '@/assets/images/store.svg'

export const NAV_BRAND = {
  label: 'Logo',
  icon: Logo,
}

export const NAV_LINKS = [
  { label: 'Store', href: '#store' },
  { label: 'Mac', href: '#mac' },
  { label: 'iPad', href: '#ipad' },
  { label: 'iPhone', href: '#iphone' },
  { label: 'Watch', href: '#watch' },
  { label: 'AirPods', href: '#airpods' },
  { label: 'Tv & Home', href: '#tv-home' },
  { label: 'Entertainment', href: '#entertainment' },
  { label: 'Accessories', href: '#accessories' },
  { label: 'Support', href: '#support' },
]

export const NAV_ACTIONS = [
  { label: 'Search', icon: Search },
  { label: 'Store', icon: Store },
]
