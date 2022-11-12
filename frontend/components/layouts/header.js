const Header = () => {
    return(
	<header >
		<nav class="fixed h-16  lg:px-32 z-50 px-7 sm:px-10 md:px-28 lg:px-32 w-[100%] bg-gray-100 shadow-lg shadow-gray-100 md:flex md:items-center md:justify-between">
			<div class="flex items-center justify-between ">
			  <span class="text-2xl font-[Poppins] cursor-pointer">
				
				<p>nodeBlog</p>
			  </span>
		
			  <span class="block mx-2 text-3xl cursor-pointer md:hidden">
				<ul onclick="navBar()">
					<p  class="w-10 h-1 mt-5 bg-black"></p>
					<p class="h-1 mt-2 bg-black w-7"></p>
					<p class="w-5 h-1 mt-2 bg-black"></p>
				</ul>
				
			  </span>
			</div>
		
			<ul class="nav-item-groups md:flex md:items-center absolute z-20 w-full md:z-auto md:static absolute  left-0 md:w-auto md:py-0 py-5 md:pl-0 pl-7 md:opacity-100 opacity-0 -top-[400px] transition-all ease-in duration-500 bg-gray-100">
			  <li class="mx-4 my-6 md:my-0">
				<a href="/" class="duration-500 hover:text-[#7e7e7e]">Home</a>
			  </li>
			  <li class="mx-4 my-6 md:my-0">
				<a href="/posts" class="duration-500 hover:text-[#7e7e7e]">Blog</a>
			  </li>
			  <li class="mx-4 my-6 md:my-0">
				<a href="#" class="duration-500 hover:text-[#7e7e7e]">About</a>
			  </li>
			  <li class="mx-4 my-6 md:my-0">
				<a href="/dashboard/user" class="duration-500 hover:text-[#7e7e7e]"></a>
			  </li>
			  <a href="/login" class="bg-black text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-white hover:text-black rounded ">
				Sign In
			  </a>
			<form action="/logout" method="post">
				<button class="bg-black text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-white hover:text-black rounded ">
					Sign Out
				</button>
			</form>
			</ul>
		  </nav>
	</header>

    )
}

export default Header;