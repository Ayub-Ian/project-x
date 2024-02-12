import React from "react";

export default function CreateService() {
  return (
    <div className="px-8 md:flex justify-center">
      <div className="max-w-2xl space-y-2 w-full">
        <div className="bg-white p-4 rounded-lg">
          <p>Back</p>
          <h5 className="font-bold text-2xl tracking-tight uppercase">New type of service</h5>
        </div>

        <section class="bg-white dark:blue-900 rounded-lg">
  <div class=" px-4 mx-auto max-w-2xl py-4 ">
      <form action="#">
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                  <label for="name" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Service Name</label>
                  <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 teblue-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex. Facial" required=""/>
              </div>
              <div class="w-full ">
                  <label for="brand" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Duration</label>
                  <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 teblue-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Minutes" required=""/>
              </div>
              <div class="w-full ">
                  <label for="price" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 teblue-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" required=""/>
              </div>
              <div>
                  <label for="category" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Category</label>
                  <select id="category" class="bg-gray-50 border border-gray-300 teblue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
                  <p class="mt-1 text-sm text-primary underline dark:text-gray-300" id="file_input_help">Add new category</p>
              </div>
              <div>
                  <label for="item-weight" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Picture</label>
                  <input type="file" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 teblue-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12" required=""/>
                  <p class="mt-1 text-sm teblue-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
              </div> 

              <div class="sm:col-span-2">
                  <label for="description" class="block mb-2 text-sm font-medium teblue-900 dark:text-white">Description (optional)</label>
                  <textarea id="description" rows="6" class="block p-2.5 w-full text-sm teblue-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write some more about this service."></textarea>
              </div>
          </div>
          <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Create service type
          </button>
      </form>
  </div>
</section>

      </div>
    </div>
  );
}
