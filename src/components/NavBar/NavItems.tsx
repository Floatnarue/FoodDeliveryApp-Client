import Link from "next/link";


const navItems =  [
    {
        title : 'Home',
        url : '/'
    },
    {
        title : 'About us',
        url : '/about'
    },
    {
        title : 'Restaurants',
        url : '/restaurants'
    },
    {
        title : 'Popular Foods',
        url : '/foods'
    },
    {
        title : 'Contact us',
        url : '/contact'
    },

]

const NavItems = ({activeItem = 0} : {activeItem? : number}) => {
  return (
    <div >
        {navItems.map((item,index) => (
            <Link key={item.url} href = {item.url} 
            className = {`px-5 text-[14px] font-Popins font-[400] ${
                activeItem === index && 'text-[#37b668]'
            }`}>
                {item.title} 
            </Link>
        ))}
    </div>
  )
}

export default NavItems