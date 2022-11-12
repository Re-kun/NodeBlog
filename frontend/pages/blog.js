const Blog = () => {
    return (
    <>
		<div>
			{/* <!-- Search input --> */}
			<div class="z-0 flex justify-center px-5 pt-32 pb-16 search"> 
				<form action="/posts/search" method="get">
					{/* <input type="text" class="w-full py-4 sm:py-auto sm:ml-20 md:ml-0 pl-4 pr-[4.3rem] rounded-lg focus:outline-none search-input" name="title"> */}
					<button type="submit" class="absolute search-button w-12 my-2 rounded-lg right-[3.5rem] p-2 bg-slate-300 text-slate-600 ">Go</button>
				</form>
			</div>


			<div class="grid gap-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">

				<div class="w-[95%] md:mx-auto sm:mx-36">
					<div class="max-w-sm mb-5 rounded-lg ">
						<div>
							{/* <img class="object-cover h-48 rounded-lg w-96" src="/img/art-design-4.jpg" alt=""> */}
						</div>
						<div class="p-5 mt-3 bg-white border border-gray-200 shadow-md">
							<div class="grid grid-cols-4 gap-4 mb-2">
								<div class="px-2 py-1 text-center rounded-md bg-slate-200 text-slate-500"><a href="/category/<%= posts[i].category.slug %>">dwede</a></div>
							</div>
							<a href="/post/<%= posts[i].id %>">
								<h5 class=" text-2xl font-bold tracking-tight text-gray-900">cewdweew</h5>
								<a href="/user/<%= posts[i].user.username %>" class="font-normal text-gray-700">uploaded by : dwedweweed</a>
							</a>
							<p class="mb-3 mt-2 font-normal text-gray-700"></p>
						</div>
					</div>
				</div>

			</div>
		</div>
	</>
    )
}

export default Blog;