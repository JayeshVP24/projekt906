import Image from "next/image"

import Logo from "../_assets/logo.svg"

const Header = () => {
  return (
    <header className="py-6">
      <Image src={Logo} alt="logo" />
    </header>
  )
}

export default Header
