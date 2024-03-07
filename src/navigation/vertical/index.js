// ** Icon imports
import StorefrontOutline from 'mdi-material-ui/StorefrontOutline'
import NoteEditOutline from 'mdi-material-ui/NoteEditOutline'
import SproutOutline from 'mdi-material-ui/SproutOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Products',
      icon: StorefrontOutline,
      path: '/products'
    },
    {
      title: 'Projects',
      icon: SproutOutline,
      path: '/projects'
    },
    {
      title: 'Users',
      icon: AccountOutline,
      path: '/users'
    },
    {
      icon: NoteEditOutline,
      title: 'Orders',
      path: '/orders'
    }
  ]
}

export default navigation
