'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Field } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";

const Options = ({category}) => {
    return <option value={category.id}>{category.name}</option>
} 

const CategorySelect = (props) => {
 
    const supabase  = createClientComponentClient()
    const [categories, setCategories] = useState(null)
    const getCategories = useCallback(async () => {
        try {
            const { data: categories, error, } = await supabase.from('categories').select('id, name')
            if (error && status !== 406) {
                throw error
              }
            if (categories) {
                setCategories(categories)
            }
        } catch (error) {
            console.error(error)
        }
    },[supabase])

    useEffect(() => {
        getCategories()
    },[getCategories])
  return (
    <>
                    <Field as="select"
                id="category"
                name="category"
                className={cn(
                    errors.category ? "border-red-400" : "border-gray-300",
                    "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  )}              >
                <option >Select category</option>
                {categories?.map(category => (<Options key={category.id} category={category} />))}
              </Field>
      
    </>
  );
};

export default CategorySelect;
