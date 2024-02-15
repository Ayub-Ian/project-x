"use client";

import { useState, useEffect, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import cn from "classnames";
import { Field, Form, Formik, ErrorMessage, useFormikContext } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast, Slide } from "react-toastify";
import CategorySelect from "./form/category-select";
import { PictureInput } from "./form/picture-input";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 25000000;

const ServiceSchema = Yup.object().shape({
  name: Yup.string().required("Field is mandatory"),
  duration: Yup.number()
    .integer("Must be a number type")
    .positive("Must be a positive value")
    .required("Field is mandatory"),
  price: Yup.number()
    .min(1, "Price cannot be below 1")
    .nullable()
    .positive("Must be a positive value"),
  category: Yup.string().nullable(),
  picture: Yup.mixed().nullable(),

  description: Yup.string().nullable(),
});

const CreateServiceForm = ({ user }) => {
  const supabase = createClientComponentClient();
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [categories, setCategories] = useState(null);
  const getCategories = useCallback(async () => {
    try {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error && status !== 406) {
        throw error;
      }
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      console.error(error);
    }
  }, [supabase]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const uploadFileToStorage = async (file) => {
    try {
      console.log("uploading image file");
      setUploading(true);
      console.log({ uploading });

      if (!file) {
        throw new Error("You must select an image to upload.");
      }

      const filePath = `${uuidv4()}-${file.name}`;

      let {
        data: { path },
        error: uploadError,
      } = await supabase.storage.from("service-images").upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      return path;
    } catch (error) {
      console.error("Error while uploading to supabase storage:", error);
    } finally {
      // setUploading(false);
      console.log("Finished uploading image file");
    }
  };

  async function createService(values) {
    let formData = values;
    formData.category = parseInt(values.category) || null;
    formData.creative_id = user.id;

    if (imageFile) {
      const res = await uploadFileToStorage(imageFile);
      console.log({ res });
      if (res) {
        formData.picture = res;
        uploadService(formData);
      }
    } else {
      uploadService(formData);
    }
  }

  async function uploadService(values) {
    try {
      const { data, error } = await supabase
        .from("services")
        .insert(values)
        .select();

      if (error) {
        console.error("Error:", error);
      }
      console.log({ data });
    } catch (error) {
      console.log("Error creating service:", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
        category: "",
        picture: "",
        duration: "",
      }}
      validationSchema={ServiceSchema}
      onSubmit={createService}
    >
      {({ errors, touched }) => (
        <Form className="w-full">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Service Name
                </label>
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="text"
                name="name"
                id="name"
                className={cn(
                  errors.name ? "border-red-400" : "border-gray-300",
                  "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                )}
                placeholder="ex. Facial"
              />
            </div>
            <div className="w-full ">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Duration
                </label>
                <ErrorMessage name="duration">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="text"
                name="duration"
                id="duration"
                className={cn(
                  errors.duration ? "border-red-400" : "border-gray-300",
                  "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                )}
                placeholder="Minutes"
              />
            </div>
            <div className="w-full ">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Price
                </label>
                <ErrorMessage name="price">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <Field
                type="number"
                name="price"
                id="price"
                className={cn(
                  errors.price ? "border-red-400" : "border-gray-300",
                  "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                )}
                placeholder="0.00"
              />
            </div>
            {/* <CategorySelect /> */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Category
                </label>
                <ErrorMessage name="category">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <Field
                as="select"
                id="category"
                name="category"
                className={cn(
                  errors.category ? "border-red-400" : "border-gray-300",
                  "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                )}
              >
                <option>Select category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <p
                className="mt-1 text-sm text-primary underline dark:text-gray-300"
                id="file_input_help"
              >
                Add new category
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="picture"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Picture
                </label>
                <ErrorMessage name="picture">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <PictureInput uploadImageFile={(value) => setImageFile(value)} />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-blue-900 dark:text-white"
                >
                  Description (optional)
                </label>
                <ErrorMessage name="description">
                  {(msg) => (
                    <div className="text-red-600 text-xs ms-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <Field
                id="description"
                as="textarea"
                rows="6"
                name="description"
                className={cn(
                  errors.description ? "border-red-400" : "border-gray-300",
                  "bg-gray-50 border  text-blue-900 text-sm rounded-lg focus:ring-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                )}
                placeholder="Write some more about this service."
              ></Field>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-full focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            {uploading ? "Creating service" : "Create service type"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateServiceForm;
