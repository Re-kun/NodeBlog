

function Menu(){
	let list = document.querySelector('.nav-item-groups');
	console.log(list)
	list.classList.toggle('top-[60px]')
	list.classList.toggle('opacity-100')
	document.querySelector("body").classList.toggle("overflow-hidden")
}

function adminSidebar(){
	console.log("y")
	const sidebar= document.querySelector(".admin-sidebar");
	if(sidebar.classList.contains("left-[-20rem]")){
		sidebar.classList.remove("left-[-20rem]")
	}else{
		sidebar.classList.add("left-[-20rem]")
	}
}