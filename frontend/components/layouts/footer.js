const Footer = () => {
    return (
    <footer class="mt-64 bg-white border-t border-gray-400 shadow">
        <div class="container flex max-w-4xl py-8 mx-auto">

            <div class="flex flex-wrap w-full mx-auto">
                <div class="flex w-full md:w-1/2 ">
                    <div class="px-8">
                        <h3 class="font-bold text-gray-900">About</h3>
                        <p class="py-4 text-sm text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
                        </p>
                    </div>
                </div>

                <div class="flex w-full md:w-1/2">
                    <div class="px-8">
                        <h3 class="font-bold text-gray-900">Social</h3>
                        <ul class="items-center pt-3 text-sm list-reset">
                            <li>
                                <a class="inline-block py-1 text-gray-600 no-underline hover:text-gray-900 hover:text-underline" href="#">Add social link</a>
                            </li>
                            <li>
                                <a class="inline-block py-1 text-gray-600 no-underline hover:text-gray-900 hover:text-underline" href="#">Add social link</a>
                            </li>
                            <li>
                                <a class="inline-block py-1 text-gray-600 no-underline hover:text-gray-900 hover:text-underline" href="#">Add social link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    )
}

export default Footer;